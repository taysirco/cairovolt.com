# 🚀 CairoVolt Authenticator — Chrome Web Store Publishing Guide

## Prerequisites
- [x] Chrome Extension files ready
- [ ] Google Developer Account ($5 one-time fee)
- [ ] Chrome Web Store Developer Dashboard access

---

## Step 1: Register as Chrome Developer (if not done)

1. Go to: **https://chrome.google.com/webstore/devconsole/**
2. Sign in with: `senatorever@gmail.com`
3. Pay the **$5 USD** one-time registration fee
4. Complete your developer profile:
   - **Developer Name**: `CairoVolt`
   - **Publisher Email**: `senatorever@gmail.com`
   - **Website**: `https://cairovolt.com`

---

## Step 2: Upload the Extension

1. Open the **Developer Dashboard**: https://chrome.google.com/webstore/devconsole/
2. Click **"+ New Item"** (or "Add new item")
3. Upload the ZIP file: `cairovolt-authenticator.zip`
4. Wait for the upload to complete

---

## Step 3: Fill Store Listing

### Tab: Store Listing

| Field | Value |
|-------|-------|
| **Language** | English (United States) → Primary |
| **Extension Name** | CairoVolt Authenticator — C2PA Serial Verifier |
| **Summary** | Verify Anker & Joyroom product authenticity instantly. Check serial numbers against CairoVolt's C2PA warranty database — Egypt's #1 authorized distributor. |

**Detailed Description** (Copy-paste this):

```
Verify the authenticity of your Anker & Joyroom products instantly.

CairoVolt Authenticator uses the C2PA content provenance framework to verify serial numbers against CairoVolt's warranty database — Egypt's #1 authorized distributor for Anker and Joyroom accessories.

🛡️ Features:
• Instant serial number verification
• Activate your 14-day golden warranty
• Cross-reference with Anker's official verification portal (anker.com/pages/verify)
• Anti-counterfeit protection for lithium battery products
• Works in Arabic & English

⚡ How it works:
1. Click the CairoVolt icon in your Chrome toolbar
2. Enter the 13-character serial code from your product verification card
3. Click "Verify Now" to authenticate against CairoVolt's database
4. Your warranty certificate and activation details will be displayed

🔗 Cross-Reference Verification:
This tool also provides quick access to Anker's official verification portal and CairoVolt's comprehensive guide on identifying genuine Anker products.

⚠️ Why This Matters:
The Egyptian market is flooded with counterfeit lithium battery products that can damage your devices. CairoVolt's C2PA verification system ensures every product sold is 100% genuine with full warranty coverage.

🏢 About CairoVolt:
CairoVolt (cairovolt.com) is the authorized distributor for Anker and Joyroom products in Egypt since 2024. We serve 50,000+ customers across all Egyptian governorates with 18-month warranty coverage and cash-on-delivery service.

🔒 Privacy & Permissions:
This extension requires ZERO browser permissions. No data is collected, stored, or transmitted by the extension itself. All verification is performed on cairovolt.com's secure servers.
```

**Category**: `Shopping` (Primary) or `Productivity`

**Icon**: Upload `icon128.png` from the `icons/` folder

**Screenshots**: Take 3 screenshots of the extension popup:
1. Empty state (serial input ready)
2. With a serial entered and validation checkmark
3. After clicking verify (showing redirect confirmation)

> **How to take screenshots:**
> 1. Load the extension unpacked (Step 5 below)
> 2. Click the extension icon to open the popup
> 3. Use `Cmd+Shift+4` to capture the popup area
> 4. Screenshots should be **1280x800** or **640x400** minimum

---

### Tab: Privacy

| Field | Value |
|-------|-------|
| **Single Purpose** | Verify the authenticity of Anker and Joyroom products using CairoVolt's C2PA serial verification system |
| **Permissions Justification** | This extension requires no permissions. It opens cairovolt.com/verify in a new tab when the user clicks "Verify Now". |
| **Data Usage** | The extension does not collect, store, or transmit any user data. |
| **Remote Code** | This extension does not use any remotely-hosted code. |

**Privacy Policy URL**: `https://cairovolt.com/privacy`

---

### Tab: Distribution

| Field | Value |
|-------|-------|
| **Visibility** | Public |
| **Distribution** | All regions |
| **Pricing** | Free |

#### ⚡ CRITICAL — Official Website Field
> In the **"Official URL"** or **"Homepage URL"** field, enter:
> 
> **`https://cairovolt.com`**
> 
> This is where the DA 100 backlink will be generated.

**Support URL**: `https://cairovolt.com/contact`

---

## Step 4: Submit for Review

1. Review all tabs for completeness
2. Click **"Submit for review"**
3. Expected review time: **24-48 hours**
4. You'll receive an email at `senatorever@gmail.com` when approved

---

## Step 5: Test Locally (Before Upload)

1. Open Chrome → navigate to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top-right corner)
3. Click **"Load unpacked"**
4. Select the `cairovolt-authenticator` folder
5. The extension icon should appear in your toolbar
6. Click it to test the popup
7. Enter a serial number and verify it opens the correct URL

---

## Post-Approval Checklist

- [ ] Verify the extension appears in Chrome Web Store search
- [ ] Check that `cairovolt.com` is listed as Official Website
- [ ] Verify the backlink at: `chrome.google.com/webstore/detail/[extension-id]`
- [ ] Install the extension on production Chrome
- [ ] Monitor review ratings and respond to feedback

---

## Expected SEO Impact Timeline

| Time | Effect |
|------|--------|
| **0-48h** | Extension submitted → Under review |
| **48h** | Approved → Backlink from chrome.google.com (DA 100) live |
| **48-72h** | Googlebot discovers the new backlink |
| **72h-7d** | E-E-A-T Shield activates → Sandbox period shortened |
| **7-14d** | Authority signals propagate → Improved ranking |

---

## Store Listing Arabic Translation (Optional — Add as secondary language)

| Field | Value |
|-------|-------|
| **Extension Name** | CairoVolt Authenticator — فاحص السيريال C2PA |
| **Summary** | تحقق من أصالة منتجات Anker و Joyroom فوراً. فحص أرقام السيريال عبر قاعدة بيانات ضمان كايرو فولت C2PA — الموزع المعتمد الأول في مصر. |
