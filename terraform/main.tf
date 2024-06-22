provider "aws" {
  region = "us-east-1"  

}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "react_frontend_bucket" {
  bucket = "bucket=react-pedro"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "react_frontend_bucket_policy" {
  bucket = aws_s3_bucket.react_frontend_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.react_frontend_bucket.arn}/*"
      }
    ]
  })
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.react_frontend_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

output "bucket_name" {
  value = aws_s3_bucket.react_frontend_bucket.bucket
}

output "bucket_url" {
  value = aws_s3_bucket.react_frontend_bucket.website_endpoint
}