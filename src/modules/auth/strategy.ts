import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<any> {
    const user = {
      googleId: profile.id,
      email: profile.emails?.[0]?.value,
      fullName: profile.displayName,
      avatar: profile.photos?.[0]?.value,
      accessToken,
      refreshToken,
    };

    console.log('✅ Google validated user:', user);

    if (!user.email) {
      return done(new Error('Google account does not have an email'), null);
    }

    return done(null, user);
  }
}
