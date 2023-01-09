resource "aws_iam_user" "s3_user" {
  name = "user-for-website-deploy"
}

resource "aws_iam_access_key" "s3_user" {
  user = aws_iam_user.s3_user.name
}
