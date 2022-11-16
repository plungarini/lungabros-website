import { Injectable } from '@angular/core';
import {
  AuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
	deleteUser,
	user
} from '@angular/fire/auth';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User as DbUser } from '../models/user.model';
import { FirebaseErrorHandling } from '../namespaces/error-auth';
import { UsersService } from './users.service';
	
	
@Injectable({
	providedIn: 'root'
})
export class AuthService {
		
	private auth = getAuth();

	ADMIN_EMAILS = [
		'pietro@lungarini.it',
		'samu@lungarini.it'
	];
	
	constructor(
		private userService: UsersService,
		private router: Router
	) { }
	
	/**
		* Performs a Login with GOOGLE provider through Firebase.
		*/
	googleLogin(): Promise<boolean> {
		const provider = new GoogleAuthProvider();
		return this.oAuthLogin(provider);
	}
	
	/**
		* Performs a Login with EMAIL provider through Firebase.
		*/
	async emailLogin(email: string, password: string): Promise<void> {
		try {
			await signInWithEmailAndPassword(this.auth, email, password);
			this.redirectAfterSignIn();
		} catch (err) {
			console.error(err);
		}
	}
	
	/**
		* Performs a Signup with EMAIL provider through Firebase.
		*/
	async emailSignup(email: string, password: string, additionalDetails?: any): Promise<boolean | string> {
		try {
			const credential = await createUserWithEmailAndPassword(this.auth, email, password);
			if (!credential.user) throw new Error('User has not been created');
			await this.userService.editOrCreate(credential.user, true, additionalDetails, true);
			this.redirectAfterSignIn();
			return true;
		} catch (e: any) {
			return e;
		}
	}
	
	/**
		* This method will send an email with a verification code.
		*
		* @param email Requires user email to send a verification code.
		*/
	sendResetPswEmail(email: string): any {
		const fn = httpsCallable(
			getFunctions(undefined, 'europe-west2'),
			'sendEmailActionCode'
		);
		return fn(email);
	}
	
	/**
		* This method will reset the password with the provided one.
		*
		* @param code it should be set to the verification code sent by email to the user.
		* @param password it should be set to the new password to overwrite the old one.
		*/
	resetPassword(code: string, password: string): Promise<any> {
		return confirmPasswordReset(this.auth, code, password).then(
			() => {
				this.router.navigate(['/auth/login'], {
					queryParams: {
						resetPassword: true
					}
				});
				return true;
			}, () => false
		);
	}
	
	/**
		* Signs out the user from the App.
		*/
	signOut(): void {
		this.router.navigateByUrl('/');
		localStorage.clear();
		signOut(this.auth);
	}
	
	/**
		* Determines if user matches a role
		*
		* @param user of type class User
		* @param allowedRoles of types string[]
		*/
	private checkAuthorization(user: DbUser, allowedRoles: string[]): boolean {
		if (!user) return false;
		for (const role of allowedRoles) {
			if ( (user.roles as any)[role] ) {
				return true;
			}
		}
		return false;
	}
	
	private async oAuthLogin(provider: AuthProvider): Promise<any> {
		try {
			const credential = await signInWithPopup(this.auth, provider);
			if (!this.ADMIN_EMAILS.includes((credential.user.email || '').toLowerCase())) {
				this.router.navigateByUrl('/');
				localStorage.clear();
				const userSub = user(getAuth()).subscribe((u) => {
					if (u) deleteUser(u);
					userSub.unsubscribe();
				});
				return this.signOut();
			};
			const userRef = doc(getFirestore(), `users/${credential.user.uid}`);
			const userSnap = await getDoc(userRef);
			const userExists = userSnap.exists();
			if (!credential.user) return;
			if (userExists) return this.redirectAfterSignIn();
			return this.userService.editOrCreate(
				credential.user, !userExists,
				{ phoneNumber: credential.user.phoneNumber },
				true,
			).then(() => {
				this.redirectAfterSignIn();
			});
		} catch (err: any) {
			return FirebaseErrorHandling.convertMessage(err.code);
		}
	}
	
	private redirectAfterSignIn(): void {
		const returnUrl = localStorage.getItem('returnUrl');
		if (returnUrl) {
			this.router.navigate([returnUrl]);
			localStorage.removeItem('returnUrl');
		} else
			this.router.navigate(['/admin']); // TODO Set custom redirect after login.
	}
}
