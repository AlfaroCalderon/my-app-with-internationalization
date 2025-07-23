import { NextRequest, NextResponse } from "next/server";

const locales = ['en-US', 'es-ES', 'ru'];

const getLocate = (request:NextRequest) => {
  const acceptLanguage = request.headers.get('accept-language');
  if(!acceptLanguage) return 'en-US'
  const languages = acceptLanguage.split(',').map(lang => lang.trim());

  for(const lang of languages){

    if(locales.includes(lang)){
        return lang;
    }

    return 'en-US';
  }

}

export function middleware(request:NextRequest){
    const {pathname} = request.nextUrl;
    const pathnameHasLocate = locales.some(
        (locale) => pathname.startsWith(`/${locale}`) || pathname ===  `${locale}`
    )

    if (pathnameHasLocate) return

    const locale = getLocate(request);
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}