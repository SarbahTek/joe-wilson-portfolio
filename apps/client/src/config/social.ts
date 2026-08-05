export const socialLinks = {
  instagram:
    "https://www.instagram.com/jwilsbass?igsh=MXV5dmlsaTUyYmR3ZQ%3D%3D&utm_source=qr",
  facebookPage: "https://www.facebook.com/share/1H4RVTgZVZ/?mibextid=wwXIfr",
  facebookPersonal: "https://www.facebook.com/share/1GrpBFusW3/?mibextid=wwXIfr",
  youtube: "https://youtube.com/@joewilsonbass?si=WkOZbY2M9fGpcX5b",
} as const;

export const footerSocialBar = [
  { label: "INSTAGRAM", icon: "ri-instagram-fill", href: socialLinks.instagram },
  { label: "FACEBOOK", icon: "ri-facebook-fill", href: socialLinks.facebookPage },
  { label: "YOUTUBE", icon: "ri-youtube-fill", href: socialLinks.youtube },
  {
    label: "CONNECT",
    icon: "ri-facebook-circle-fill",
    href: socialLinks.facebookPersonal,
  },
] as const;

export const footerSocialIcons = [
  { label: "Instagram", icon: "ri-instagram-fill", href: socialLinks.instagram },
  { label: "Facebook Page", icon: "ri-facebook-fill", href: socialLinks.facebookPage },
  { label: "YouTube", icon: "ri-youtube-fill", href: socialLinks.youtube },
  {
    label: "Personal Facebook",
    icon: "ri-facebook-circle-fill",
    href: socialLinks.facebookPersonal,
  },
] as const;
