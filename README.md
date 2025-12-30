
# 🛡️ CareSync Pro
### **Institutional Healthcare ERP & Neural Fleet Orchestrator**

CareSync Pro is a high-fidelity institutional platform designed for modern healthcare enterprises.

## 🌐 Custom Domain Setup
To point your domain to this project:
1. **Add to Vercel**: Settings > Domains > Add `yourdomain.com`.
2. **Configure DNS**:
   - **A Record**: `@` -> `76.76.21.21`
   - **CNAME Record**: `www` -> `cname.vercel-dns.com`
3. **Environment Variables**: Update `SUPABASE_URL` or any callback URLs in your provider dashboards to match your new domain.

## 🚀 Deployment
Vercel handles the build pipeline automatically using the `vercel.json` and `package.json` in the root.
