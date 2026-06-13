-- ============================================================
-- SkillSphere — Lessons Seed Data
-- Run this in your skillsphere_db database.
-- This adds demo lessons for all existing courses.
-- Adjust course_id values if your courses have different IDs.
-- ============================================================

USE skillsphere_db;

-- ── Check your existing course IDs first (run this SELECT):
-- SELECT course_id, title FROM courses;

-- ── Lessons for course_id = 1 (Web Development) ──────────────
INSERT INTO lessons (course_id, title, content) VALUES
(1, 'Introduction to Web Development',
'Welcome to Web Development!\n\nThe web is built on three core technologies:\n1. HTML – gives structure to content\n2. CSS – adds style and layout\n3. JavaScript – makes pages interactive\n\nIn this course you will learn how to build complete websites from scratch. By the end, you will be able to create pages that look great and work well on all devices.'),

(1, 'HTML Basics',
'HTML stands for HyperText Markup Language.\n\nEvery HTML page has this basic structure:\n\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <p>This is a paragraph.</p>\n  </body>\n</html>\n\nKey tags to remember:\n- <h1> to <h6> — Headings\n- <p> — Paragraph\n- <a href=""> — Link\n- <img src=""> — Image\n- <div> — Container block'),

(1, 'CSS Fundamentals',
'CSS (Cascading Style Sheets) controls how HTML elements look.\n\nBasic syntax:\n  selector {\n    property: value;\n  }\n\nExample:\n  h1 {\n    color: blue;\n    font-size: 32px;\n  }\n\nThe box model (every element has):\n- Content\n- Padding (space inside)\n- Border\n- Margin (space outside)\n\nFlexbox is the easiest way to align items:\n  display: flex;\n  justify-content: center;\n  align-items: center;'),

(1, 'JavaScript Essentials',
'JavaScript adds behaviour to your pages.\n\nCore concepts:\n1. Variables — store data\n   let name = "Alice";\n   const age = 25;\n\n2. Functions — reusable code blocks\n   function greet(name) {\n     return "Hello, " + name;\n   }\n\n3. DOM manipulation — change the page\n   document.getElementById("title").textContent = "New Title";\n\n4. Events — respond to user actions\n   button.addEventListener("click", () => {\n     alert("Clicked!");\n   });\n\nJavaScript runs directly in the browser — no installation needed.'),

(1, 'Responsive Design',
'Responsive design means your website looks good on all screen sizes — desktop, tablet, and mobile.\n\nKey techniques:\n\n1. Use relative units instead of fixed pixels:\n   width: 100%  instead of  width: 800px\n\n2. Media queries change styles at certain screen widths:\n   @media (max-width: 768px) {\n     .menu { display: none; }\n   }\n\n3. Meta viewport tag (always put this in <head>):\n   <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n4. CSS Flexbox and Grid automatically adapt to screen size.\n\nTip: Always design for mobile first, then expand to larger screens.');

-- ── Lessons for course_id = 2 (UI/UX Design) ─────────────────
INSERT INTO lessons (course_id, title, content) VALUES
(2, 'What is UI/UX Design?',
'UI and UX are two related but different things:\n\nUX (User Experience) — focuses on how a product feels.\nUI (User Interface) — focuses on how a product looks.\n\nA good product needs both:\n- UX ensures the user can complete tasks easily.\n- UI ensures the interface looks polished and professional.\n\nExample: An app could have a beautiful UI but terrible UX if buttons are confusing or hard to find.\n\nAs a designer your goal is to make digital products that are both easy to use and visually appealing.'),

(2, 'Design Principles',
'These 5 principles guide good design:\n\n1. Contrast — make important elements stand out\n   Use dark text on light backgrounds for readability.\n\n2. Alignment — keep elements lined up\n   Consistent alignment creates order and professionalism.\n\n3. Proximity — group related items together\n   Things that belong together should be close to each other.\n\n4. Repetition — use consistent styles throughout\n   Same fonts, colors, and button styles across all pages.\n\n5. Whitespace — do not crowd your design\n   Empty space is not wasted space. It helps users focus.\n\nRemember: good design is invisible. Users should accomplish tasks without thinking about the interface.'),

(2, 'Color Theory Basics',
'Color affects mood, readability, and user trust.\n\nPrimary colors: Red, Blue, Yellow\nSecondary colors: Orange, Green, Purple\n\nUseful concepts:\n- Hue: the actual color (red, blue, green)\n- Saturation: how vivid the color is\n- Lightness: how light or dark the color is\n\nFor digital screens use HEX or HSL codes:\n  #6366f1  →  indigo\n  hsl(239, 84%, 67%)  →  same color in HSL\n\nColor tips for UI design:\n- Use 1-2 brand colors and 1 neutral palette\n- High contrast between text and background\n- Use color to convey meaning (red = error, green = success)\n- Do not rely on color alone to communicate information'),

(2, 'Wireframing and Prototyping',
'Before writing any code, designers sketch out the structure of a page.\n\nWireframe — a simple sketch showing layout without colors or final content.\n  - Can be drawn on paper or in tools like Figma, Whimsical\n  - Shows where headings, buttons, images will be placed\n  - No design details yet\n\nPrototype — an interactive wireframe that simulates the real app.\n  - Users can click through and test flows\n  - Helps find usability problems early\n  - Made in Figma, Adobe XD, or InVision\n\nWhy wireframe first?\n  Changing a wireframe takes 5 minutes.\n  Changing code takes hours.\n  Always plan before you build.'),

(2, 'Usability Testing',
'Usability testing means watching real users try to use your product.\n\nWhy test?\n  Designers often assume users think like them. They do not.\n  Testing reveals actual problems before launch.\n\nSimple testing process:\n1. Pick 3-5 people who represent your target users\n2. Give them a task: "Find and enroll in a course"\n3. Watch without helping — note where they struggle\n4. After the session, ask what was confusing\n5. Fix the top 3 problems and test again\n\nYou do not need expensive labs. Testing with 5 users finds 85% of usability problems.\n\nGolden rule: test early, test often.');

-- ── If you have more courses, add similar blocks below.
-- ── Example for a third course (course_id = 3):
-- INSERT INTO lessons (course_id, title, content) VALUES
-- (3, 'Lesson Title', 'Lesson content here...');
