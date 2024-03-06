import { Component } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { Router } from '@angular/router';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
   

  constructor(private authService: UserServiceService, private storageService: StorageService) { }
   // Define errorMessage property here
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.signIn(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  /** 
  constructor(private authService: UserServiceService, private router: Router) { }
  
  signIn(signInFormData: any): void {
    const { username, password } = signInFormData;
    this.authService.signIn(username, password)
      .subscribe(
        response => {
          console.log('Sign-in successful:', response);
          // Handle success response, e.g., redirect to dashboard
          this.errorMessage = '';
          this.router.navigateByUrl('/');
        },
        error => {
          this.errorMessage = error.error.message; 
        }
      );
   
  }*/

}
