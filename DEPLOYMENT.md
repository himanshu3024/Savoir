# SAVOIR E-commerce Deployment Guide

## Prerequisites

1. **Azure Account** with SQL Database service
2. **Vercel Account** for hosting
3. **Stripe Account** for payments (optional)
4. **Domain name** (optional)

## Step 1: Azure SQL Database Setup

### 1.1 Create Azure SQL Database
\`\`\`bash
# Using Azure CLI
az sql server create \
  --name savoir-sql-server \
  --resource-group your-resource-group \
  --location eastus \
  --admin-user your-admin-username \
  --admin-password your-secure-password

az sql db create \
  --resource-group your-resource-group \
  --server savoir-sql-server \
  --name savoir_ecommerce \
  --service-objective Basic
\`\`\`

### 1.2 Configure Firewall
\`\`\`bash
# Allow Azure services
az sql server firewall-rule create \
  --resource-group your-resource-group \
  --server savoir-sql-server \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Allow your IP (for development)
az sql server firewall-rule create \
  --resource-group your-resource-group \
  --server savoir-sql-server \
  --name AllowMyIP \
  --start-ip-address YOUR_IP \
  --end-ip-address YOUR_IP
\`\`\`

### 1.3 Get Connection Details
- Server: `savoir-sql-server.database.windows.net`
- Database: `savoir_ecommerce`
- Username: `your-admin-username`
- Password: `your-secure-password`

## Step 2: Environment Configuration

### 2.1 Create .env.local file
\`\`\`bash
cp .env.example .env.local
\`\`\`

### 2.2 Update environment variables
\`\`\`env
# Azure SQL Database
AZURE_SQL_SERVER=savoir-sql-server.database.windows.net
AZURE_SQL_DATABASE=savoir_ecommerce
AZURE_SQL_USERNAME=your-admin-username
AZURE_SQL_PASSWORD=your-secure-password
AZURE_SQL_PORT=1433
AZURE_SQL_ENCRYPT=true
AZURE_SQL_TRUST_SERVER_CERTIFICATE=false

# Authentication
NEXTAUTH_SECRET=your-super-secret-nextauth-key-min-32-chars
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-key

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
\`\`\`

## Step 3: Database Setup

### 3.1 Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3.2 Setup database schema
\`\`\`bash
npm run db:setup
\`\`\`

### 3.3 Seed initial data (optional)
\`\`\`bash
npm run db:seed
\`\`\`

## Step 4: Local Development

### 4.1 Start development server
\`\`\`bash
npm run dev
\`\`\`

### 4.2 Test the application
- Visit `http://localhost:3000`
- Test user registration/login
- Test product browsing
- Test cart functionality

## Step 5: Vercel Deployment

### 5.1 Install Vercel CLI
\`\`\`bash
npm i -g vercel
\`\`\`

### 5.2 Login to Vercel
\`\`\`bash
vercel login
\`\`\`

### 5.3 Deploy to Vercel
\`\`\`bash
vercel
\`\`\`

### 5.4 Configure Environment Variables in Vercel
\`\`\`bash
# Add environment variables
vercel env add AZURE_SQL_SERVER
vercel env add AZURE_SQL_DATABASE
vercel env add AZURE_SQL_USERNAME
vercel env add AZURE_SQL_PASSWORD
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add JWT_SECRET
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_PUBLISHABLE_KEY
\`\`\`

### 5.5 Update NEXTAUTH_URL
\`\`\`bash
vercel env add NEXTAUTH_URL production https://your-domain.vercel.app
\`\`\`

### 5.6 Deploy production
\`\`\`bash
vercel --prod
\`\`\`

## Step 6: Domain Configuration (Optional)

### 6.1 Add custom domain in Vercel dashboard
1. Go to your project in Vercel dashboard
2. Navigate to Settings > Domains
3. Add your custom domain
4. Configure DNS records as instructed

### 6.2 Update environment variables
\`\`\`bash
vercel env add NEXTAUTH_URL production https://your-custom-domain.com
\`\`\`

## Step 7: SSL and Security

### 7.1 Verify SSL certificate
- Vercel automatically provides SSL certificates
- Ensure HTTPS is working properly

### 7.2 Security headers
- Vercel automatically adds security headers
- Additional headers can be configured in `next.config.js`

## Step 8: Monitoring and Analytics

### 8.1 Vercel Analytics
- Enable Vercel Analytics in dashboard
- Monitor performance and usage

### 8.2 Error Monitoring (Optional)
\`\`\`bash
# Add Sentry for error tracking
npm install @sentry/nextjs
\`\`\`

## Step 9: Backup and Maintenance

### 9.1 Database Backup
\`\`\`bash
# Azure SQL Database automatic backups are enabled by default
# Configure long-term retention if needed
\`\`\`

### 9.2 Regular Updates
\`\`\`bash
# Update dependencies regularly
npm update
npm audit fix
\`\`\`

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check firewall rules
   - Verify connection string
   - Ensure Azure SQL Database is running

2. **Environment Variables Not Loading**
   - Verify variable names match exactly
   - Check Vercel dashboard for correct values
   - Redeploy after adding variables

3. **Build Failures**
   - Check TypeScript errors
   - Verify all dependencies are installed
   - Check build logs in Vercel dashboard

4. **Authentication Issues**
   - Verify NEXTAUTH_URL is correct
   - Check NEXTAUTH_SECRET is set
   - Ensure JWT_SECRET is configured

### Performance Optimization

1. **Database Optimization**
   - Use connection pooling
   - Implement query caching
   - Optimize database indexes

2. **Frontend Optimization**
   - Enable Next.js image optimization
   - Use dynamic imports for large components
   - Implement proper caching strategies

3. **CDN Configuration**
   - Vercel automatically provides CDN
   - Configure custom cache headers if needed

## Security Checklist

- [ ] Environment variables are secure
- [ ] Database firewall is properly configured
- [ ] HTTPS is enabled
- [ ] Authentication is working
- [ ] Input validation is implemented
- [ ] SQL injection protection is in place
- [ ] Rate limiting is configured
- [ ] Error messages don't expose sensitive data

## Production Checklist

- [ ] Database is set up and accessible
- [ ] All environment variables are configured
- [ ] Application builds successfully
- [ ] All features are working
- [ ] Performance is acceptable
- [ ] Security measures are in place
- [ ] Monitoring is configured
- [ ] Backup strategy is implemented
- [ ] Domain and SSL are configured
- [ ] Analytics are tracking properly

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Verify Azure SQL Database connectivity
3. Review environment variable configuration
4. Test locally before deploying
5. Contact support if needed

## Cost Optimization

### Azure SQL Database
- Use Basic tier for development
- Scale up for production based on usage
- Monitor DTU usage and optimize queries

### Vercel
- Free tier supports most small applications
- Pro tier for custom domains and advanced features
- Monitor bandwidth and function execution time

### Additional Services
- Use free tiers where possible
- Monitor usage and costs regularly
- Implement proper caching to reduce API calls
