<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>سياسة الخصوصية — Claude Arabic RTL Fix</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "Noto Naskh Arabic", "Segoe UI", Tahoma, Arial, sans-serif;
    background: #0f0f0f;
    color: #f0ede8;
    direction: rtl;
    line-height: 1.9;
    padding: 0;
  }
  .hero {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a1f1a 100%);
    border-bottom: 1px solid #333;
    padding: 40px 32px 32px;
    text-align: center;
  }
  .logo {
    width: 64px; height: 64px;
    background: linear-gradient(135deg, #cc785c, #e8a87c);
    border-radius: 16px;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 36px;
    margin-bottom: 16px;
  }
  .hero h1 { font-size: 24px; font-weight: 700; color: #f0ede8; margin-bottom: 6px; }
  .hero p  { font-size: 14px; color: #888; }
  .container { max-width: 760px; margin: 0 auto; padding: 40px 24px 80px; }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #1a2a1a; border: 1px solid #2d4a2d;
    border-radius: 8px; padding: 8px 16px;
    font-size: 13px; color: #4caf7d;
    margin-bottom: 36px;
  }
  .badge::before { content: "✓"; font-weight: 700; }
  section { margin-bottom: 36px; }
  h2 {
    font-size: 17px; font-weight: 700;
    color: #e8a87c;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #2a2a2a;
    display: flex; align-items: center; gap: 10px;
  }
  h2 .icon {
    width: 28px; height: 28px; border-radius: 7px;
    background: #2a1f1a; border: 1px solid #3a2a1a;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
  }
  p { font-size: 14px; color: #ccc; margin-bottom: 10px; }
  ul { padding-right: 20px; padding-left: 0; margin-bottom: 10px; }
  ul li { font-size: 14px; color: #ccc; margin-bottom: 6px; }
  ul li::marker { color: #cc785c; }
  .highlight {
    background: #1a1a1a; border: 1px solid #2a2a2a;
    border-right: 3px solid #cc785c;
    border-radius: 0 8px 8px 0;
    padding: 14px 16px;
    font-size: 14px; color: #ccc;
    margin: 14px 0;
  }
  .contact-card {
    background: #1a1a1a; border: 1px solid #333;
    border-radius: 12px; padding: 20px 24px;
    margin-top: 14px;
  }
  .contact-card a { color: #e8a87c; text-decoration: none; }
  .contact-card a:hover { text-decoration: underline; }
  .last-updated {
    text-align: center; font-size: 12px; color: #555;
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid #1e1e1e;
  }
  @media (max-width: 600px) {
    .hero { padding: 28px 20px; }
    .container { padding: 28px 16px 60px; }
  }
</style>
</head>
<body>

<div class="hero">
  <div class="logo">🌙</div>
  <h1>سياسة الخصوصية</h1>
  <p>Claude Arabic RTL Fix — إضافة Chrome</p>
</div>

<div class="container">

  <div class="badge">لا نجمع أي بيانات شخصية</div>

  <section>
    <h2><span class="icon">📋</span> نظرة عامة</h2>
    <p>
      إضافة <strong>Claude Arabic RTL Fix</strong> هي أداة مفتوحة المصدر تعمل بالكامل داخل متصفحك. صُمّمت لتحسين عرض النصوص العربية على موقع claude.ai دون أي تواصل مع خوادم خارجية.
    </p>
  </section>

  <section>
    <h2><span class="icon">🔒</span> ما الذي لا نجمعه</h2>
    <ul>
      <li>لا نجمع أي نصوص أو محادثات تجري على claude.ai</li>
      <li>لا نجمع معلومات شخصية من أي نوع (اسم، بريد إلكتروني، موقع…)</li>
      <li>لا نرسل أي بيانات إلى خوادم خارجية</li>
      <li>لا نستخدم ملفات تتبع (cookies) أو تحليلات (analytics)</li>
      <li>لا نشارك أي معلومات مع أطراف ثالثة</li>
    </ul>
  </section>

  <section>
    <h2><span class="icon">⚙️</span> كيف تعمل الإضافة</h2>
    <p>تعمل الإضافة محلياً بالكامل داخل المتصفح:</p>
    <ul>
      <li>تكتشف النصوص العربية والعبرية باستخدام خوارزمية تعمل في المتصفح مباشرةً</li>
      <li>تُطبّق تنسيق RTL على العناصر النصية في الصفحة</li>
      <li>تحفظ إعدادات التفضيلات (مفعّل/موقوف) في <code>chrome.storage.local</code> — وهو تخزين محلي داخل المتصفح فقط</li>
    </ul>
    <div class="highlight">
      البيانات الوحيدة المُخزَّنة هي: حالة التفعيل (مفعّل أو موقوف) وعداد المسح — ولا تغادر متصفحك أبداً.
    </div>
  </section>

  <section>
    <h2><span class="icon">🛡️</span> الصلاحيات المطلوبة وسببها</h2>
    <ul>
      <li><strong>storage</strong> — لحفظ إعداد التفعيل محلياً في المتصفح</li>
      <li><strong>activeTab</strong> — لتطبيق تنسيق RTL على الصفحة الحالية فقط</li>
      <li><strong>host_permissions: claude.ai</strong> — لتشغيل السكريبت على موقع claude.ai حصراً</li>
    </ul>
    <p>لا تملك الإضافة صلاحية الوصول إلى أي موقع آخر.</p>
  </section>

  <section>
    <h2><span class="icon">🌐</span> خدمات الطرف الثالث</h2>
    <p>
      لا تستخدم هذه الإضافة أي خدمات خارجية أو واجهات برمجية (APIs) أو شبكات تتبع. الكود يعمل بالكامل في بيئة المتصفح المعزولة.
    </p>
  </section>

  <section>
    <h2><span class="icon">👶</span> خصوصية الأطفال</h2>
    <p>
      لا تجمع الإضافة أي بيانات من أي مستخدم بمن فيهم القاصرون. لا توجد أي آلية لجمع المعلومات الشخصية.
    </p>
  </section>

  <section>
    <h2><span class="icon">🔄</span> التغييرات على هذه السياسة</h2>
    <p>
      في حال تحديث هذه السياسة، سيتم تحديث تاريخ "آخر تعديل" أدناه. يُنصح بمراجعة هذه الصفحة دورياً. الاستمرار في استخدام الإضافة يعني موافقتك على أي تحديثات.
    </p>
  </section>

  <section>
    <h2><span class="icon">📬</span> تواصل معنا</h2>
    <p>لأي استفسار بخصوص الخصوصية:</p>
    <div class="contact-card">
      <p style="margin:0;color:#ccc;">
        البريد الإلكتروني:
        <a href="mailto:privacy@rtl-fix.app">privacy@rtl-fix.app</a>
      </p>
    </div>
  </section>

  <div class="last-updated">
    آخر تعديل: مايو 2025 &nbsp;·&nbsp; Claude Arabic RTL Fix v1.0
  </div>

</div>
</body>
</html>
