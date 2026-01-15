# Deployment Guide - Render

This guide will walk you through deploying the Google Search Multi-Country Comparison app to Render.

## Overview

The application consists of two services:
- **Backend**: Node.js/Express Web Service
- **Frontend**: React/Vite Static Site

## Prerequisites

- GitHub account with the repository
- Render account (free): https://render.com
- Google Custom Search API credentials

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

Ensure all changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 3: Deploy Using Blueprint

1. **Go to Render Dashboard**
   - Click "New +" button
   - Select "Blueprint"

2. **Connect Repository**
   - Choose your GitHub repository: `google-multiple-countries-search`
   - Render will automatically detect `render.yaml`

3. **Review Services**
   - You should see two services:
     - `google-search-backend` (Web Service)
     - `google-search-frontend` (Static Site)

4. **Click "Apply"**

### Step 4: Configure Environment Variables

#### Backend Service Environment Variables

1. Go to your backend service in Render Dashboard
2. Navigate to "Environment" tab
3. Add the following variables:

```
GOOGLE_API_KEY=your_api_key_here
GOOGLE_CX_ID=your_search_engine_id_here
FRONTEND_URL=https://your-frontend-name.onrender.com
PORT=3001
NODE_ENV=production
```

**Important**: Replace the values with your actual credentials!

#### Frontend Service Environment Variables

1. Go to your frontend service in Render Dashboard
2. Navigate to "Environment" tab
3. Add the following variable:

```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

**Note**: You'll get the backend URL after the backend service is deployed.

### Step 5: Deploy Services

1. **Backend deploys first** (takes 2-5 minutes)
   - Watch the logs in the Render Dashboard
   - Wait for "Build successful" message
   - Note the backend URL: `https://google-search-backend.onrender.com`

2. **Update Frontend Environment Variable**
   - Go to frontend service → Environment
   - Set `VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api`
   - Trigger manual deploy if needed

3. **Frontend deploys** (takes 2-5 minutes)
   - Wait for "Build successful" message
   - Note the frontend URL: `https://google-search-frontend.onrender.com`

4. **Update Backend CORS**
   - Go to backend service → Environment
   - Set `FRONTEND_URL=https://YOUR-FRONTEND-URL.onrender.com`
   - Service will auto-redeploy

### Step 6: Test Your Deployment

1. **Backend Health Check**
   - Visit: `https://your-backend-name.onrender.com/health`
   - Should return: `{"status":"OK","message":"サーバーは正常に動作しています"}`

2. **Frontend Access**
   - Visit: `https://your-frontend-name.onrender.com`
   - You should see the application interface

3. **Test Search Functionality**
   - Select two countries
   - Enter a search query
   - Click Search
   - Results should appear from both countries

### Step 7: (Optional) Enable SQLite Persistence

**Note**: This requires upgrading to a paid plan ($7/month)

1. Go to backend service in Render Dashboard
2. Click "Storage" tab
3. Click "Add Disk"
4. Configure:
   - **Name**: `sqlite-data`
   - **Mount Path**: `/opt/render/project/src/backend/database`
   - **Size**: 1 GB
5. Click "Save"
6. Service will redeploy with persistent storage

Uncomment the disk section in `render.yaml`:

```yaml
disk:
  name: sqlite-data
  mountPath: /opt/render/project/src/backend/database
  sizeGB: 1
```

## Important Notes

### Free Plan Limitations

- **Backend Sleep**: Spins down after 15 minutes of inactivity
- **Cold Start**: Takes 30-50 seconds to wake up on first request
- **No Persistence**: SQLite data is reset on each deployment
- **750 hours/month**: Shared across all free services

### Upgrading to Paid Plan

Benefits of upgrading backend to paid ($7/month):
- ✅ Always running (no sleep)
- ✅ Faster response times
- ✅ Persistent SQLite database
- ✅ Better performance

### API Usage Considerations

- Google Custom Search API: 100 queries/day (free tier)
- Each search uses 6 API queries (3 pages × 2 countries)
- ~16 searches per day on free tier

## Troubleshooting

### CORS Errors

**Symptom**: Frontend can't connect to backend

**Solution**:
1. Check `FRONTEND_URL` in backend environment variables
2. Ensure it matches your frontend URL exactly
3. No trailing slash in the URL

### API Connection Failed

**Symptom**: "検索中にエラーが発生しました"

**Solutions**:
1. Check `VITE_API_URL` in frontend environment variables
2. Verify backend is running (check health endpoint)
3. Wait for backend to wake up (30-50 seconds on free plan)

### Build Failures

**Backend Build Fails**:
- Check Node.js version (should be 18+)
- Verify all dependencies in `package.json`
- Check build logs for specific errors

**Frontend Build Fails**:
- Ensure `VITE_API_URL` is set before build
- Check for ESLint or TypeScript errors
- Verify all dependencies are installed

### Google API Errors

**Symptom**: "Google API エラー"

**Solutions**:
1. Verify `GOOGLE_API_KEY` is correct
2. Verify `GOOGLE_CX_ID` is correct
3. Check Custom Search API is enabled in Google Cloud Console
4. Ensure you haven't exceeded daily quota (100 queries)

## Monitoring and Maintenance

### View Logs

1. Go to service in Render Dashboard
2. Click "Logs" tab
3. Monitor for errors or issues

### Check Metrics

1. Go to service in Render Dashboard
2. Click "Metrics" tab
3. View CPU, Memory, and Request metrics

### Trigger Manual Deploy

1. Go to service in Render Dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

## Custom Domain (Optional)

To use your own domain:

1. Go to service in Render Dashboard
2. Click "Settings" tab
3. Scroll to "Custom Domain"
4. Add your domain
5. Update DNS records as instructed
6. Update `FRONTEND_URL` environment variable

## Cost Optimization

### Keep Free Plan

- Accept 15-minute sleep time
- Data resets on deploys
- Good for demos and testing

### Upgrade Backend Only ($7/month)

- Backend always running
- Persistent SQLite data
- Keep frontend on free plan
- Best balance of cost/performance

### Alternative: PostgreSQL

Instead of SQLite with paid plan, consider:
- Render PostgreSQL (free tier available)
- Requires database migration
- More scalable for production

## Support

If you encounter issues:

1. Check Render Status: https://status.render.com
2. Review Render Docs: https://render.com/docs
3. Check application logs in Render Dashboard
4. Review this project's GitHub Issues

## Next Steps

After successful deployment:

1. ✅ Bookmark your deployment URLs
2. ✅ Monitor API usage in Google Cloud Console
3. ✅ Set up custom domain (optional)
4. ✅ Configure alerting in Render (optional)
5. ✅ Consider upgrading for production use

---

**Your Deployment URLs:**

- Frontend: `https://google-search-frontend.onrender.com`
- Backend: `https://google-search-backend.onrender.com`
- Health Check: `https://google-search-backend.onrender.com/health`

Enjoy your deployed application! 🚀
