# 🧪 **Roster.AI MVP Testing Guide**

## **🎯 Test Account Setup**

### **Registration Test:**
- **Email:** `test@example.com`
- **Username:** `testuser`
- **First Name:** `Test`
- **Last Name:** `User`
- **Password:** `password123`

## **✅ Core Feature Testing Checklist**

### **1. User Authentication**
- [ ] User registration works
- [ ] User login works
- [ ] Logout works
- [ ] Session persists after page refresh

### **2. Date Management**
- [ ] Add new date to roster
- [ ] All form fields work (sliders, dropdowns, text inputs)
- [ ] Date appears in roster list
- [ ] Date details display correctly

### **3. Image Upload & AI Analysis**
- [ ] Upload profile image (under 5MB)
- [ ] Image displays after upload
- [ ] AI analysis results show
- [ ] Analysis includes: attractiveness, confidence, style, mood

### **4. AI Insights**
- [ ] Insights tab loads
- [ ] Shows personalized insights (if data exists)
- [ ] Shows general advice (if no data)
- **Expected Insights:**
  - Chemistry Pattern
  - Communication Style
  - Red Flag Awareness
  - Date Planning

### **5. UI/UX**
- [ ] Sexy gradient background displays
- [ ] Neon green text is visible
- [ ] Glass morphism effects work
- [ ] Responsive design on mobile

## **🐛 Common Issues & Solutions**

### **Issue: "Cannot connect to backend"**
**Solution:** Check that `REACT_APP_BACKEND_URL` environment variable is set correctly in Vercel

### **Issue: "Database connection failed"**
**Solution:** Verify `DATABASE_URL` is set to your Supabase pooler connection string

### **Issue: "Image upload fails"**
**Solution:** Ensure image is under 5MB and in supported format (JPG, PNG, etc.)

### **Issue: "Registration fails"**
**Solution:** Check that all required fields are filled and email format is valid

## **📱 Mobile Testing**

Test on mobile device:
- [ ] Responsive design works
- [ ] Touch interactions work
- [ ] Image upload works on mobile
- [ ] Form inputs are mobile-friendly

## **🔗 API Endpoints to Test**

Test these endpoints directly:
- `GET /api/health` - Should return server status
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/dates` - Add date (requires auth)
- `GET /api/dates` - Get user's dates (requires auth)
- `POST /api/ai/insights` - Get AI insights
- `POST /api/upload/profile-image` - Upload image

## **🎉 Success Criteria**

Your MVP is working correctly if:
1. ✅ Users can register and login
2. ✅ Users can add dates with all details
3. ✅ Image upload and AI analysis works
4. ✅ AI insights are generated
5. ✅ UI looks "sexy" with gradients and effects
6. ✅ All features work on both desktop and mobile

## **📞 Support**

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors

---

**Your Roster.AI MVP is ready for users!** 🚀 