import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "Nitheesh Edla — Cloud, DevOps & SRE Engineer",
  description:
    "Cloud, DevOps & SRE Engineer with 7+ years building secure multi-cloud infrastructure (AWS, Azure, GCP), automating CI/CD pipelines, defining SLOs, and delivering self-service developer platforms. CKA, AWS SAA-C03, AZ-400 certified. Based in Dallas, TX — open to Cloud Engineer, DevOps, SRE, and Platform Engineer roles.",
  keywords: [
    "Cloud Engineer",
    "DevOps Engineer",
    "SRE",
    "Site Reliability Engineer",
    "Platform Engineer",
    "Kubernetes",
    "Terraform",
    "AWS",
    "Azure",
    "GCP",
    "CI/CD",
    "Infrastructure as Code",
    "CKA",
    "Dallas Texas",
    "Nitheesh Edla",
  ],
  authors: [{ name: "Nitheesh Edla" }],
  openGraph: {
    title: "Nitheesh Edla — Cloud, DevOps & SRE Engineer",
    description:
      "7+ years building secure multi-cloud infrastructure, automating delivery pipelines, and improving reliability through SLOs and self-service platforms. CKA · AWS SAA-C03 · AZ-400.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Nitheesh Edla — Cloud, DevOps & SRE Engineer",
    description:
      "7+ years building secure multi-cloud infrastructure, automating delivery pipelines, and improving reliability through SLOs and self-service platforms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
