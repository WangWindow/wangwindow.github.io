export const SITE = {
  website: "https://wangwindow.github.io/", // replace this with your deployed domain
  author: "WangWindow",
  profile: "https://github.com/WangWindow",
  desc: "Life beyond the screen matters.",
  title: "Github Pages",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 10,
  archivesPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/WangWindow/wangwindow.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  // 备案信息（可选）：填写你的ICP备案号和公安备案号与对应链接，留空则不显示
  beian: {
    icp: {
      number: "皖ICP备2024033902号-1", // e.g. "粤ICP备12345678号"
      url: "https://beian.miit.gov.cn", // e.g. "https://beian.miit.gov.cn/"
    },
    police: {
      number: "", // e.g. "粤公网安备 44000000000000号"
      url: "", // e.g. "http://www.beian.gov.cn/"
    },
  },
} as const;
