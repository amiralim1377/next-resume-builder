import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fa", "en"];
const defaultLocale = "fa";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  try {
    const preferredLocales = acceptLanguage.split(",").map((lang) => {
      const [locale] = lang.split(";");
      return locale.trim().substring(0, 2).toLowerCase();
    });

    for (const lang of preferredLocales) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  } catch (error) {
    return defaultLocale;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);

  const redirectUrl = new URL(
    `/${locale}${pathname}${request.nextUrl.search}`,
    request.url,
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\.[\\w]+$).*)",
  ],
};
