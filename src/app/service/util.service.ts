import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  encryptSecretKey = "diego";
  msg: string;
  logostring: string;
  subj: any;
  constructor(
    private router:Router,
    ) {
  }

  private vehicleSubject = new BehaviorSubject<any>('');
  vehicleList = this.vehicleSubject.asObservable();

  private logoSubject = new BehaviorSubject<any>(this.logostring);
  logo = this.logoSubject.asObservable();

  private userSubject = new BehaviorSubject<any>('');
  user = this.userSubject.asObservable();

  private userListSubject = new BehaviorSubject<any>('');
  userList = this.userListSubject.asObservable();

  private packageSubject = new BehaviorSubject<any>('');
  packageList = this.packageSubject.asObservable();

  private subscriptionSubject = new BehaviorSubject<any>('');
  subscriptionList = this.subscriptionSubject.asObservable();

  private otpSubject = new BehaviorSubject<any>('');
  otpList = this.otpSubject.asObservable();

  private docSubject = new BehaviorSubject<any>('');
  docList = this.docSubject.asObservable();

  private tripSubject = new BehaviorSubject<any>('');
  tripList = this.tripSubject.asObservable();

  setVehicleInfo(data){
    this.vehicleSubject.next(data);
  }
  logoInfo(data){
    this.logoSubject.next(data);
  }
  setUserInfo(data){
    this.userSubject.next(data);
  }
  storeUserList(data){
    this.userListSubject.next(data);
  }
  storePackageList(data){
    this.packageSubject.next(data);
  }
  storeSubscriptionList(data){
    this.subscriptionSubject.next(data);
  }
  storeVehicleList(data){
    this.vehicleSubject.next(data);
  }
  storeOTPList(data){
    this.otpSubject.next(data);
  }
  storeTripList(data){
    this.tripSubject.next(data);
  }
  storeDocList(data){
    this.docSubject.next(data);
  }
  async getToday(){
    let d = new Date()
    let formatted = await this.formatDate(d);
    return formatted
  }
  async getMondayOfCurrentWeek(){
    let d = new Date()
    const day = d.getDay();
    const dateObj =  new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0?-6:1)-day );
    let formatted = await this.formatDate(dateObj)
    return formatted
  }
  formatDate(dateObj){
    let month = (dateObj.getMonth()+1);
    let monthStr = month<10? ('0' + month): month;
    let dateStr = dateObj.getDate()< 10? ('0' + dateObj.getDate()): dateObj.getDate();
    let year = dateObj.getFullYear().toString()
    return dateStr+"/"+monthStr+"/"+year
  }
  async getSundayOfCurrentWeek(){
    let d = new Date()
    const day = d.getDay();
    const dateObj = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0?0:7)-day );
    let formatted = this.formatDate(dateObj)
    return formatted
  }
  async getFirstDayOfCurrentMonth(){
    let d = new Date()
    const dateObj = new Date(d.getFullYear(), d.getMonth(), 1);
    let formatted = this.formatDate(dateObj)
    return formatted
  }
  async getAllDatesOfCurrentWeek(){
    let values = [1,2,3,4,5,6,7]
    let days = []
    let d = new Date()
    const day = d.getDay();
    values.forEach(el => {
      const dateObj = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0?0:el)-day );
      let formatted = this.formatDate(dateObj)
      let obj = {sn:el,date:formatted}
      days.push(obj)
    });
    return days
  }
  async getLastDayOfCurrentMonth(){
    let d = new Date()
    const dateObj = new Date(d.getFullYear(), d.getMonth()+1, 0)
    let formatted = this.formatDate(dateObj)
    return formatted
  }
  async getFirstDayOfTheYear() {
    const dateObj = new Date(new Date().getFullYear(), 0, 1);
    let formatted = this.formatDate(dateObj)
    return formatted
  }
  
  async getLastDayOfTheYear() {
    const dateObj = new Date(new Date().getFullYear(), + 12, 0);
    let formatted = await this.formatDate(dateObj)
    return formatted
  }
  isAthourized(allowedUsertypes: string[]): any{
    //check if the list of allowedusertpes for aroute is empty, 
    //if empty, authorize the user to access the page
    if (allowedUsertypes == null || allowedUsertypes.length === 0){
        return true;
    }
    const authUsertype = 'admin';
    //console.log("role:", authUsertype)
    return allowedUsertypes.includes(authUsertype);
  }
  setUserObject(userObject) {
    localStorage.setItem('ki', CryptoJS.AES.encrypt(JSON.stringify(userObject), this.encryptSecretKey).toString())
  }

  getUserObject() {
    const user = localStorage.getItem('ki');
    if(user){
      const bytes = CryptoJS.AES.decrypt(user, this.encryptSecretKey);
      return  JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }
  setUser(user) {
    localStorage.setItem('u-z', CryptoJS.AES.encrypt(JSON.stringify(user), this.encryptSecretKey).toString())
  }

  getUser() {
    const user = localStorage.getItem('u-z');
    if(user){
      const bytes = CryptoJS.AES.decrypt(user, this.encryptSecretKey);
      return  JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }

  setToken(token){
    localStorage.setItem('xxx', CryptoJS.AES.encrypt(JSON.stringify(token), this.encryptSecretKey).toString())
  }

  getToken(){
    let token = localStorage.getItem('xxx')
    if(token){
      const bytes = CryptoJS.AES.decrypt(token, this.encryptSecretKey);
      return  JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }

  removeUser() {
  localStorage.removeItem("ki");
  localStorage.removeItem("xxx");
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('xxx')){
      return true;
    }
    return false
  }
  logout() {
    this.removeUser();
    this.router.navigateByUrl("/");
  }
  dialogConfig(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '576px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    return dialogConfig
  }
}
