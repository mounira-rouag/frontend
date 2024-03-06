import { Component } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  selectedRoles: string[] = [];
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';



  constructor(
    private authService: UserServiceService,
    private snackBar: MatSnackBar
  ) { }

  signUp(signUpData: User) {
    signUpData.roles = this.selectedRoles;
    this.authService.registerUser(signUpData).subscribe(
      response => {
        // Handle successful signup (if needed)
      },
      error => {
        // Handle signup error
        this.errorMessage = error.error.message ; // Handle potential missing message in error response
        this.isSignUpFailed = true;
      }
    );
  }
}
