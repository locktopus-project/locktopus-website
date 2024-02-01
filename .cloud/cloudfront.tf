resource "aws_cloudfront_distribution" "cdn" {
  comment             = "CDN for ${var.DOMAIN_NAME}"
  is_ipv6_enabled     = true
  price_class         = "PriceClass_200"
  wait_for_deployment = false
  enabled             = true

  origin {
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cdn_identity.cloudfront_access_identity_path
    }

    origin_id   = "static_s3"
    domain_name = aws_s3_bucket.s3_static_bucket.bucket_regional_domain_name
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/404.html"
  }

  aliases = [var.DOMAIN_NAME]

  default_cache_behavior {
    target_origin_id       = "static_s3" # key in `origin` above
    viewer_protocol_policy = "redirect-to-https"

    default_ttl = 5400
    min_ttl     = 3600
    max_ttl     = 7200

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    # query_string    = false

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.append_index_html.arn
    }
  }

  default_root_object = "index.html"

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.main_certificate.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }

  # Unless the certificate is validated, it cannot be attached to Cloudfront distribution
  depends_on = [
    aws_acm_certificate_validation.main_certificate_validation
  ]
}

resource "aws_cloudfront_origin_access_identity" "cdn_identity" {
  comment = "Cloudfront CDN identity"
}

# Allow cloudfront distribution invalidation

resource "aws_iam_user_policy" "cloudfront_invalidation" {
  name   = "cloudfront_invalidation"
  user   = aws_iam_user.s3_user.name
  policy = data.aws_iam_policy_document.cloudfront_invalidation.json
}

data "aws_iam_policy_document" "cloudfront_invalidation" {
  statement {
    effect = "Allow"
    actions = [
      "cloudfront:CreateInvalidation",
    ]
    resources = [
      aws_cloudfront_distribution.cdn.arn,
    ]
  }
}

# Edge functions for appending index.html to folder paths
resource "aws_cloudfront_function" "append_index_html" {
  name    = "append_index_html_for_${replace(var.DOMAIN_NAME, ".", "-")}"
  runtime = "cloudfront-js-1.0"

  code = file("${path.module}/append_index_html.js")
}


