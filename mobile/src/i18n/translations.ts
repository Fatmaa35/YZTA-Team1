/**
 * Simple in-house i18n dictionary (Turkish + English).
 *
 * `useSettings().t('key')` resolves a key against the active language, falling
 * back to the key itself when missing. Kept intentionally tiny — no external lib.
 */

export type Language = 'tr' | 'en';

export const translations = {
  tr: {
    // Tabs
    'tab.today': 'Bugün',
    'tab.weekly': 'Haftalık',
    'tab.profile': 'Profil',

    // Login
    'login.studentNo': 'Öğrenci Numarası',
    'login.password': 'Şifre',
    'login.forgot': 'Şifremi Unuttum',
    'login.submit': 'Giriş Yap',
    'login.forgotTitle': 'Şifremi Unuttum',
    'login.forgotBody': 'Lütfen okul idaresi ile iletişime geçin.',
    'login.failedTitle': 'Giriş başarısız',

    // Nutrition
    'nutrition.calories': 'Kalori',
    'nutrition.carbs': 'Karbonhidrat',
    'nutrition.protein': 'Protein',
    'nutrition.fat': 'Yağ',

    // Meal detail / today
    'meal.allergensTitle': 'Alerjen Etiketleri',
    'meal.rate': 'Değerlendir',
    'meal.detailTitle': 'Yemek Detayı',

    // Meal names
    'meal.steak-egg': 'Izgara Biftek & Yumurta',
    'meal.avocado-salad': 'Avakadolu Bakliyat Salata',
    'meal.mushroom-pasta': 'Mantarlı Makarna',
    'meal.fish-veg': 'Sebze Yatağında Balık',
    'meal.rice-chicken': 'Pilav & Sebzeli Tavuk',
    'meal.lentil-soup': 'Mercimek Çorbası & Ekmek',
    'meal.meatball': 'Izgara Köfte & Bulgur',

    // Allergen labels
    'allergen.egg': 'Yumurta',
    'allergen.milk': 'Süt',
    'allergen.pepper': 'Karabiber',
    'allergen.peanut': 'Fıstık',
    'allergen.cauliflower': 'Karnabahar',
    'allergen.gluten': 'Gluten',

    // Departments
    'dept.computer': 'Bilgisayar Müh.',

    // Shared meal description (placeholder)
    'meal.description':
      'Bu yemek, mevsimin taze malzemeleriyle özenle hazırlanır. Dengeli bir öğün için ideal olan tarif, yüksek protein ve lif içeriğiyle öğrencilere enerji verir. Servis edilmeden önce mutfağımızda titizlikle pişirilir.',

    // Rating
    'rating.title': 'MENÜYÜ PUANLA',
    'rating.commentPlaceholder': 'Yorumunuz...',
    'rating.taste': 'Lezzet',
    'rating.temperature': 'Sıcaklık',
    'rating.portion': 'Porsiyon',
    'rating.submit': 'Gönder',
    'rating.sentToast': 'Geri bildiriminiz gönderildi.',
    'rating.missingTitle': 'Eksik puan',
    'rating.missingBody': 'Lütfen bir yıldız puanı seçin.',
    'rating.errorTitle': 'Hata',
    'rating.errorBody': 'Değerlendirme gönderilemedi. Tekrar deneyin.',

    // Weekly
    'weekly.title': 'HAFTALIK MENÜ',
    'weekly.calorieUnit': 'kalori',
    'weekly.pickWeek': 'Hafta Seçin',
    'weekly.week': 'Hafta',

    // Profile
    'profile.title': 'PROFİLİM',
    'profile.studentNo': 'Öğrenci No',
    'profile.department': 'Bölüm',
    'profile.sensitivities': 'Hassasiyetlerim',
    'profile.addNew': 'Yeni Ekle',
    'profile.add': '+ EKLE',
    'profile.addPlaceholder': 'Alerjen ekle...',
    'profile.alreadyTitle': 'Zaten ekli',
    'profile.emptySensitivities': 'Henüz hassasiyet eklenmedi.',
    'profile.preferences': 'Tercihler',
    'profile.theme': 'Tema',
    'profile.language': 'Dil',
    'profile.themeDark': 'Koyu',
    'profile.themeLight': 'Açık',
    'profile.logout': 'Çıkış Yap',
    'profile.logoutConfirmTitle': 'Çıkış Yap',
    'profile.logoutConfirmBody': 'Hesabınızdan çıkış yapmak istiyor musunuz?',
    'profile.cancel': 'Vazgeç',

    // Common
    'common.ok': 'Tamam',
    'common.thanks': 'Teşekkürler!',

    // Days (keyed by weekly item id)
    'day.mon': 'Pazartesi',
    'day.tue': 'Salı',
    'day.wed': 'Çarşamba',
    'day.thu': 'Perşembe',
    'day.fri': 'Cuma',
  },
  en: {
    // Tabs
    'tab.today': 'Today',
    'tab.weekly': 'Weekly',
    'tab.profile': 'Profile',

    // Login
    'login.studentNo': 'Student Number',
    'login.password': 'Password',
    'login.forgot': 'Forgot Password',
    'login.submit': 'Log In',
    'login.forgotTitle': 'Forgot Password',
    'login.forgotBody': 'Please contact the school administration.',
    'login.failedTitle': 'Login failed',

    // Nutrition
    'nutrition.calories': 'Calories',
    'nutrition.carbs': 'Carbs',
    'nutrition.protein': 'Protein',
    'nutrition.fat': 'Fat',

    // Meal detail / today
    'meal.allergensTitle': 'Allergen Tags',
    'meal.rate': 'Rate',
    'meal.detailTitle': 'Meal Detail',

    // Meal names
    'meal.steak-egg': 'Grilled Steak & Egg',
    'meal.avocado-salad': 'Avocado & Legume Salad',
    'meal.mushroom-pasta': 'Mushroom Pasta',
    'meal.fish-veg': 'Fish on Vegetables',
    'meal.rice-chicken': 'Rice & Chicken with Veggies',
    'meal.lentil-soup': 'Lentil Soup & Bread',
    'meal.meatball': 'Grilled Meatballs & Bulgur',

    // Allergen labels
    'allergen.egg': 'Egg',
    'allergen.milk': 'Milk',
    'allergen.pepper': 'Black Pepper',
    'allergen.peanut': 'Peanut',
    'allergen.cauliflower': 'Cauliflower',
    'allergen.gluten': 'Gluten',

    // Departments
    'dept.computer': 'Computer Eng.',

    // Shared meal description (placeholder)
    'meal.description':
      'This dish is carefully prepared with fresh, seasonal ingredients. Ideal for a balanced meal, its high protein and fiber content gives students energy. It is cooked meticulously in our kitchen before being served.',

    // Rating
    'rating.title': 'RATE THE MENU',
    'rating.commentPlaceholder': 'Your comment...',
    'rating.taste': 'Taste',
    'rating.temperature': 'Temperature',
    'rating.portion': 'Portion',
    'rating.submit': 'Submit',
    'rating.sentToast': 'Your feedback has been submitted.',
    'rating.missingTitle': 'Missing rating',
    'rating.missingBody': 'Please select a star rating.',
    'rating.errorTitle': 'Error',
    'rating.errorBody': 'Could not submit your rating. Please try again.',

    // Weekly
    'weekly.title': 'WEEKLY MENU',
    'weekly.calorieUnit': 'calories',
    'weekly.pickWeek': 'Select Week',
    'weekly.week': 'Week',

    // Profile
    'profile.title': 'MY PROFILE',
    'profile.studentNo': 'Student No',
    'profile.department': 'Department',
    'profile.sensitivities': 'My Sensitivities',
    'profile.addNew': 'Add New',
    'profile.add': '+ ADD',
    'profile.addPlaceholder': 'Add allergen...',
    'profile.alreadyTitle': 'Already added',
    'profile.emptySensitivities': 'No sensitivities added yet.',
    'profile.preferences': 'Preferences',
    'profile.theme': 'Theme',
    'profile.language': 'Language',
    'profile.themeDark': 'Dark',
    'profile.themeLight': 'Light',
    'profile.logout': 'Log Out',
    'profile.logoutConfirmTitle': 'Log Out',
    'profile.logoutConfirmBody': 'Do you want to log out of your account?',
    'profile.cancel': 'Cancel',

    // Common
    'common.ok': 'OK',
    'common.thanks': 'Thank you!',

    // Days
    'day.mon': 'Monday',
    'day.tue': 'Tuesday',
    'day.wed': 'Wednesday',
    'day.thu': 'Thursday',
    'day.fri': 'Friday',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['tr'];
