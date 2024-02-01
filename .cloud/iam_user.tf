resource "aws_iam_user" "s3_user" {
  # append domain name to the user name to make it unique
  name = "user-for-website-deploy-${var.DOMAIN_NAME}"
}

resource "aws_iam_access_key" "s3_user" {
  user = aws_iam_user.s3_user.name
}
