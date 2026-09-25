# Yusuf Eryilmaz - Personal Portfolio Website

A world-class, ultra-modern portfolio website built for **Senior Full-Stack Engineer & Architectural Design Lead** Yusuf Eryilmaz. Crafted specifically for static web hosting on **AWS S3** and edge acceleration via **Amazon CloudFront**.

---

## 🌟 Key Highlights & Features

1. **Design System & Aesthetics**:
   - Modern dark/light theme with ambient mesh glows, glassmorphism cards (`backdrop-filter: blur`), and hairline borders.
   - Elegant typography pairing Google's **Space Grotesk** (display headings), **Plus Jakarta Sans** (body text), and **JetBrains Mono** (technical badges & terminal).
   - Zero framework overhead — 100% pure semantic HTML5, modern CSS3 variables, and modular Vanilla JavaScript.

2. **Interactive Elements**:
   - **Dynamic Typewriter**: Highlights core architectural disciplines.
   - **Animated Key Metric Counters**: Showcases 5+ years experience, 200+ enterprise clients, 80% platform efficiency boosts, and 100% nationwide dealership adoption.
   - **Interactive Developer Terminal**: Embedded macOS/Linux CLI allowing visitors to test commands (`help`, `whoami`, `skills`, `experience`, `aws`, `contact`, `resume`, `clear`).
   - **Filterable Projects Showcase**: Instant category filtering (All, AI & Real-time, Enterprise Cloud, Mobile & Web, Fintech).
   - **One-Click Clipboard Copy**: Direct email and phone copying with animated toast confirmation.
   - **Integrated Resume Viewer**: Modal preview of official resume PDF and direct 1-click download.

3. **SEO & Structured Data**:
   - Complete OpenGraph and Twitter card metadata.
   - Valid JSON-LD Schema (`Person` / `SoftwareEngineer`) for enhanced Google search snippets.

---

## 📁 File Structure

```
yusuf_website/
├── index.html                 # Semantic, SEO-optimized markup & structure
├── css/
│   └── style.css              # Custom design system, tokens, and responsive queries
├── js/
│   └── main.js                # Interactive terminal, theme toggle, filters, animations
├── assets/
│   ├── profile.jpg            # High-resolution retina profile photo (optimized)
│   ├── profile_thumb.jpg      # Lightweight thumbnail
│   └── Yusuf_Eryilmaz_Resume.pdf # Official downloadable & previewable resume
├── deploy-s3.sh               # 1-command AWS S3 sync & cache-control deployment script
└── README.md                  # Project documentation & AWS guide
```

---

## 🚀 How to Run Locally

You can run this site locally using Python's built-in HTTP server or Node `npx serve`:

```bash
# Option 1: Python (Built-in on macOS)
python3 -m http.server 8000

# Option 2: Node
npx serve .
```

Then open `http://localhost:8000` in your web browser.

---

## ☁️ How to Deploy to AWS S3 & CloudFront

### Step 1: Create an S3 Bucket
1. Open the [AWS S3 Console](https://s3.console.aws.amazon.com/).
2. Create a bucket (e.g., `yusuf-eryilmaz-portfolio`).
3. Under **Object Ownership**, select **ACLs disabled**.
4. In **Block Public Access settings**, uncheck **Block all public access** (acknowledge warning).
5. After creating, go to **Properties** > scroll down to **Static website hosting** > click **Edit**:
   - Select **Enable**
   - Index document: `index.html`
   - Error document: `index.html`
   - Click **Save changes**.

### Step 2: Set Bucket Policy for Public Read Access
In **Permissions** > **Bucket Policy**, paste the following (replace `YOUR_BUCKET_NAME`):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```

### Step 3: Deploy using `deploy-s3.sh`
Edit `deploy-s3.sh` to set your bucket name:
```bash
BUCKET_NAME="YOUR_BUCKET_NAME"
```

Then execute:
```bash
./deploy-s3.sh
```

### (Recommended) Step 4: Add Amazon CloudFront & Custom Domain
For HTTPS and custom domain (e.g., `yusuferyilmaz.com`):
1. In CloudFront Console, create a distribution with your S3 website endpoint as the Origin.
2. Under **Viewer Protocol Policy**, select **Redirect HTTP to HTTPS**.
3. Attach your custom SSL Certificate from AWS Certificate Manager (ACM).
4. Point your Route53 or domain DNS alias to the CloudFront distribution domain name.
