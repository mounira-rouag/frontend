import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifiyemail',
  templateUrl: './verifiyemail.component.html',
  styleUrls: ['./verifiyemail.component.css']
})
export class VerifiyemailComponent {
  errorMessage!: string;

  constructor(private userService: UserServiceService, private router: Router) { }

  verifyEmail(email: string): void {
    this.userService.verifyEmail(email).subscribe(
      response => {
        // Email exists, navigate to change password page
        this.router.navigateByUrl('/change-password');
      },
      error => {
        // Handle error
        this.errorMessage = error.error.message;
      }
    );
  }

}
