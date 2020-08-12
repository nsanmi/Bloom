import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root",
})
export class CrudService {
  baseUrl = '';
  vehicleUrl = '';
  userUrl = '';
  tripUrl = '';
  subscriptionUrl = '';
  constructor(private http: HttpClient, private util: UtilService) {
    this.tripUrl = environment.tripUrl;
    this.vehicleUrl = environment.vehicleUrl;
    this.userUrl = environment.userUrl;
    this.subscriptionUrl = environment.subscriptionUrl;
  }

  //TRIPS APIS
  getInterstateTrips() {
    let getUrl = this.tripUrl + `interstate/trip`
    return this.http.get(getUrl)
      .toPromise();
  }
  getInterstateTripsPending(){
    let getUrl = this.tripUrl + `all/rider/pending/intratrips`
    return this.http.get(getUrl)
      .toPromise();
  }
  getIntraTrips() {
    let getUrl = this.tripUrl + `intrastate/trip`
    return this.http.get(getUrl)
      .toPromise();
  }
  getIntraTipsPending(){
    let getUrl = this.tripUrl + `all/rider/pending/intratrips`
    return this.http.get(getUrl)
      .toPromise();
  }
  getChatterTrips() {
    let getUrl = this.tripUrl + `charter/trip`
    return this.http.get(getUrl)
      .toPromise();
  }
  getPendingIntraTrips() {
    let getUrl = this.tripUrl + `pending/intratrips`
    return this.http.get(getUrl)
      .toPromise();
  }

  getPendingInterTrips() {
    let getUrl = this.tripUrl + `pending/intertrips`
    return this.http.get(getUrl)
      .toPromise();
  }
  // USER / ADMIN FUNCTIONS
  login(data) {
    let getUrl = this.userUrl + 'login';
    return this.http.post(getUrl, data)
      .toPromise()
  }
  logoutAll() {
    return this.http.post("logout/all", {})
      .toPromise();
  }
  logout() {
    return this.http.post("logout", {})
      .toPromise();
  }
  verifyUser(data) {
    let getUrl = this.userUrl + 'verify/user';
    return this.http.put(getUrl, data)
      .toPromise();
  }
  getUsersCount() {
    let getUrl = this.userUrl + 'count/user';
    return this.http.get(getUrl)
      .toPromise()
  }
  deactivateUser(data) {
    let getUrl = this.userUrl + 'block/user';
    return this.http.patch(getUrl, data)
      .toPromise();
  }
  verifyUserProfilePicture(data) {
    let getUrl = this.userUrl + 'verify/user/picture';
    return this.http.put(getUrl, data)
      .toPromise();
  }
  getAllRegisteredUser() {
    let getUrl = this.userUrl + 'all/user'
    return this.http.get(getUrl)
      .toPromise();
  }
  getSingleUserDetails(uid) {
    let getUrl = this.userUrl + `single/user/${uid}`
    return this.http.get(getUrl)
      .toPromise();
  }
  rejectUserProfilePicture(data) {
    let getUrl = this.userUrl + 'reject/user/picture';
    return this.http.patch(getUrl, data)
      .toPromise();
  }
  getAllOtpSent() {
    let getUrl = this.userUrl + 'all/otp'
    return this.http.post(getUrl, {})
      .toPromise();
  }
  sendSmsToUser(data) {
    let getUrl = this.userUrl + 'send/user/sms'
    return this.http.post(getUrl, data)
      .toPromise();
  }
  grantUserAdminAccess(data) {
    let getUrl = this.userUrl + 'grant/user_admin'
    return this.http.post(getUrl, data)
      .toPromise();
  }
  revokeUserAdminAccess(data) {
    let getUrl = this.userUrl + 'revoke/user_admin'
    return this.http.post(getUrl, data)
      .toPromise();
  }
  deleteUserOtp(data) {
    let getUrl = this.userUrl + 'delete/otp';
    return this.http.put(getUrl, data)
      .toPromise();
  }
  deleteUserAccount(data) {
    let getUrl = this.userUrl + 'delete/user';
    return this.http.put(getUrl, data)
      .toPromise();
  }

  // VEHICLES FUNCTIONS
  getVehicles(data) {
    let getUrl = this.vehicleUrl + 'vehicles'
    return this.http.get(getUrl, data)
      .toPromise();
  }
  getVehicleCount() {
    let getUrl = this.vehicleUrl + 'admin/count/vehicles';
    return this.http.get(getUrl)
      .toPromise();
  }
  getVehicleDetails(data) {
    let getUrl = `${this.vehicleUrl}vehicle/${data.vid}/${data.admin_id}`
    return this.http.get(getUrl)
      .toPromise();
  }
  getDriverDefaultVehicle(id) {
    let getUrl = this.vehicleUrl + 'driver/default/vehicle'
    return this.http.get(`${getUrl}?id=${id}`)
      .toPromise();
  }
  getDriverVehicle(id, data) {
    let getUrl = this.vehicleUrl + 'vehicle'
    return this.http.post(getUrl, data)
      .toPromise();
  }
  getLicenses(data) {
    let getUrl = this.vehicleUrl + 'licenses'
    return this.http.get(getUrl, data)
      .toPromise();
  }
  verifyLicence(data) {
    let getUrl = this.vehicleUrl + 'licenses'
    return this.http.put(getUrl, data)
      .toPromise();
  }
  declineLicence(data) {
    let getUrl = this.vehicleUrl + 'licenses'
    return this.http.patch(getUrl, data)
      .toPromise();
  }
  verifyVehicle(data) {
    let getUrl = this.vehicleUrl + 'admin/vehicle';
    return this.http.put(getUrl, data)
      .toPromise();
  }
  rejectVehicle(data) {
    let getUrl = this.vehicleUrl + 'admin/vehicle';
    return this.http.patch(getUrl, data)
      .toPromise();
  }
  updateVehicle(data) {
    let getUrl = this.vehicleUrl + 'vehicles';
    return this.http.put(getUrl, data)
      .toPromise();
  }

  // PACKAGES FUNCTIONS
  createPackage(data) {
    let getUrl = this.subscriptionUrl + 'packages';
    return this.http.put(getUrl, data)
      .toPromise();
  }
  getPackages() {
    let getUrl = this.subscriptionUrl + 'packages';
    return this.http.get(getUrl)
      .toPromise();
  }

  getSinglePackage(data) {
    let getUrl = this.subscriptionUrl + 'package';
    return this.http.post(getUrl, data)
      .toPromise();
  }
  updatePackage(data) {
    let getUrl = this.subscriptionUrl + 'package';
    return this.http.put(getUrl, data)
      .toPromise();
  }
  deletePackage(data) {
    let getUrl = this.subscriptionUrl + 'package';
    return this.http.delete(getUrl, data)
      .toPromise();
  }
  deleteUerSubscription(data) {
    let getUrl = this.subscriptionUrl + 'subscription';
    return this.http.patch(getUrl, data)
      .toPromise();
  }
  getAllUserPreviousAndCurrentSubscription(data) {
    let getUrl = this.subscriptionUrl + 'subscription';
    return this.http.post(getUrl, data)
      .toPromise();
  }
  getUserActiveSubscription(data) {
    let getUrl = this.subscriptionUrl + 'user/subscription';
    return this.http.get(getUrl, data)
      .toPromise();
  }
  getAllSubscriptions() {
    let getUrl = this.subscriptionUrl + 'subscriptions';
    return this.http.get(getUrl)
      .toPromise();
  }
  getSubscriptionCount() {
    let getUrl = this.subscriptionUrl + 'subscriptions';
    return this.http.patch(getUrl, {})
      .toPromise();
  }

}
