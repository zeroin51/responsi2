import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kontak',
  templateUrl: './kontak.page.html',
  styleUrls: ['./kontak.page.scss'],
})
export class KontakPage implements OnInit {

  constructor(public _apiService: ApiService, private modal:ModalController, private router: Router) { }
  dataKontak: any = [];
  modal_tambah = false;
  id: any;
  nama: any;
  email: any;
  telepon: any;
  ngOnInit() {
    this.getKontak();
    }
    getKontak() {
    this._apiService.tampil('tampil.php').subscribe({
    next: (res: any) => {
    console.log('sukses', res);
    this.dataKontak = res;
    },
    error: (err: any) => {
    console.log(err);
    },
    })
    }
      reset_model() {
      this.id = null;
      this.nama = '';
      this.email = '';
      this.telepon = '';
      }
      open_modal_tambah(isOpen: boolean) {
        this.modal_tambah = isOpen;
        this.reset_model();
        this.modal_tambah = true;
        this.modal_edit = false;
        }
      cancel() {
      this.modal.dismiss();
      this.modal_tambah = false;
      this.reset_model();
      }
      tambahKontak() {
        if (this.nama != '' && this.email != '' && this.telepon!='') {
        let data = {
        nama: this.nama,
        email: this.email,
        telepon: this.telepon,
        }
        this._apiService.tambah(data, '/tambah.php')
        .subscribe({
        next: (hasil: any) => {
        this.reset_model();
        console.log('berhasil tambah kontak');
        this.getKontak();
        this.modal_tambah = false;
        this.modal.dismiss();
        },
        error: (err: any) => {
        console.log('gagal tambah kontak');
        }
        })
        } else {
        console.log('gagal tambah kontak karena masih ada data yg kosong');
        }
        }
      hapusKontak(id: any) {
          this._apiService.hapus(id,
          '/hapus.php?id=').subscribe({
          next: (res: any) => {
          console.log('sukses', res);
          this.getKontak();
          console.log('berhasil hapus data');
          },
          error: (error: any) => {
          console.log('gagal');
          }
          })
          }
      ambilKontak(id: any) {
            this._apiService.lihat(id,
            '/lihat.php?id=').subscribe({
            next: (hasil: any) => {
            console.log('sukses', hasil);
            let kontak = hasil;
            this.id = kontak.id;
            this.nama = kontak.nama;
            this.email = kontak.email;
            this.telepon = kontak.telepon;
            },
            error: (error: any) => {
            console.log('gagal ambil data');
            }
            })
            }
            modal_edit = false;
      open_modal_edit(isOpen: boolean, idget: any) {
              this.modal_edit = isOpen;
              this.id = idget;
              console.log(this.id);
              this.ambilKontak(this.id);
              this.modal_tambah = false;
              this.modal_edit = true;
              }
              editKontak() {
                let data = {
                id: this.id,
                nama: this.nama,
                email: this.email,
                telepon: this.telepon
                }
                this._apiService.edit(data, '/edit.php')
                .subscribe({
                next: (hasil: any) => {
                console.log(hasil);
                this.reset_model();
                this.getKontak();
                console.log('berhasil edit Kontak');
                this.modal_edit = false;
                this.modal.dismiss();
                },
                error: (err: any) => {
                console.log('gagal edit Kontak');
                }
                })
                }
                goToLoginPage() {
                  this.router.navigate(['/login']);
                }
}
