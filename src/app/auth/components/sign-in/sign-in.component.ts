import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjaxService, UtilityService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/dashboard/guards/auth-guard.service';
import { get as _get } from 'lodash';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  formSubmitted: boolean = false;
  constructor(private _fb: FormBuilder,
              private ajax: AjaxService,
              private _router: Router,
              private utilService: UtilityService,
              private authGuard: AuthGuardService) { }

  ngOnInit() {
    this._router.navigate(['/dashboard']);
    this.signInForm = this._fb.group({
      userName: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.signInForm.invalid) {
      return;
    }
    const payload = {
      request: this.signInForm.value
    };
    this.ajax.sendRequest('LOGIN', payload).subscribe(data => {
      if (!!data) {
        this.utilService.setUser(_get(data, 'response.details'));
        if(this.authGuard.nextUrl){
          this._router.navigateByUrl(this.authGuard.nextUrl);
          this.authGuard.nextUrl='';
        } else {
          this._router.navigate(['/dashboard']);
        }
      }
    },
    err => {
      console.log(err);
    });
  }

}
