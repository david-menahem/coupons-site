import { Navigate, Route, Routes } from 'react-router-dom'
import AddCompany from '../../AdminArea/Company/AddCompany/AddCompany'
import CompanyList from '../../AdminArea/Company/CompanyList/CompanyList'
import DeleteCompany from '../../AdminArea/Company/DeleteCompany/DeleteCompany'
import UpdateCompany from '../../AdminArea/Company/UpdateCompany/UpdateCompany'
import UpdateCompanyPassword from '../../AdminArea/Company/UpdateCompanyPassword/UpdateCompanyPassword'
import AddCustomer from '../../AdminArea/Customer/AddCustomer/AddCustomer'
import CustomerList from '../../AdminArea/Customer/CustomerList/CustomerList'
import DeleteCustomer from '../../AdminArea/Customer/DeleteCustomer/DeleteCustomer'
import UpdateCustomer from '../../AdminArea/Customer/UpdateCustomer/UpdateCustomer'
import UpdateCustomerPassowrd from '../../AdminArea/Customer/UpdateCustomerPassowrd/UpdateCustomerPassowrd'
import Login from '../../AuthArea/Login/Login'
import Logout from '../../AuthArea/Logout/Logout'
import AddCoupon from '../../CompanyArea/AddCoupon/AddCoupon'
import CompanyCoupons from '../../CompanyArea/CompanyCoupons/CompanyCoupons'
import CompanyDetails from '../../CompanyArea/CompanyDetails/CompanyDetails'
import UpdateCoupon from '../../CompanyArea/UpdateCoupon/UpdateCoupon'
import Home from '../HomeArea/Home/Home'
import PageNotFound from '../PageNotFound/PageNotFound'
import './Routing.css'
import CompanyCouponsMaxPrice from '../../CompanyArea/CompanyCouponsMaxPrice/CompanyCouponsMaxPrice'
import CompanyCouponsCategory from '../../CompanyArea/CompanyCouponsCategory/CompanyCouponsCategory'
import DeleteCoupon from '../../CompanyArea/DeleteCoupon/DeleteCoupon'
import BuyCoupon from '../../CustomerArea/BuyCoupon/BuyCoupon'
import CustomerCoupons from '../../CustomerArea/CustomerCoupons/CustomerCoupons'
import CustomerCouponsCategory from '../../CustomerArea/CustomerCouponsCategory/CustomerCouponsCategory'
import CustomerCouponsMaxPrice from '../../CustomerArea/CustomerCouponsMaxPrice/CustomerCouponsMaxPrice'
import CustomerDetails from '../../CustomerArea/CustomerDetails/CustomerDetails'
import Register from '../../AuthArea/Register/Register'
import RegisterCompany from '../../AuthArea/Register/RegisterCompany/RegisterCompany'
import RegisterCustomer from '../../AuthArea/Register/RegisterCustomer/RegisterCustomer'

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register_company" element={<RegisterCompany />} />
        <Route path="/register_customer" element={<RegisterCustomer />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="/admin/companies" element={<CompanyList />}/>
        <Route path="/admin/add_company/" element={<AddCompany />} />
        <Route path="/admin/update_company/:cId" element={<UpdateCompany />} />
        <Route path="/admin/update_company_password/:cId" element={<UpdateCompanyPassword />} />
        <Route path="/admin/delete_company/:cId" element={<DeleteCompany />} />

        <Route path="/admin/customers" element={<CustomerList />}/>
        <Route path="/admin/add_customer" element={<AddCustomer />} />
        <Route path="/admin/update_customer/:cId" element={<UpdateCustomer />} />
        <Route path="/admin/update_customer_password/:cId" element={<UpdateCustomerPassowrd />} />
        <Route path="/admin/delete_customer/:cId" element={<DeleteCustomer />} />

        <Route path="/company/coupons/:cId" element={<CompanyCoupons />} />
        <Route path="/company/coupons/by_category/:cId" element={<CompanyCouponsCategory />} />
        <Route path="/company/coupons/by_max_price/:cId" element={<CompanyCouponsMaxPrice />} />
        <Route path="/company/add_coupon/:cId" element={<AddCoupon />} />
        <Route path="/company/update_coupon/:cId/:couponId" element={<UpdateCoupon />} />
        <Route path="/company/delete_coupon/:couponId" element={<DeleteCoupon />} />
        <Route path="/company/:cId" element={<CompanyDetails />} />
        
        <Route path="/customer/coupons/:cId" element={<CustomerCoupons />} />
        <Route path="/customer/coupons/by_category/:cId" element={<CustomerCouponsCategory />} />
        <Route path="/customer/coupons/by_max_price/:cId" element={<CustomerCouponsMaxPrice />} />
        <Route path="/customer/buy_coupon/" element={<BuyCoupon />} />
        <Route path="/customer/:cId" element={<CustomerDetails />} />
{/*          */}
      </Routes>
    </div>
  )
}

export default Routing;
