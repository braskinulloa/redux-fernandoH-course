import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  logOut() {
    this.auth.logOut()
      .then( res => {
        this.router.navigate(['/login']);
      })
      .catch( (err: FirebaseError) => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'close'
        })
      });
  }
}
