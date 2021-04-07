import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue';
import AuthLayout from 'src/pages/Pages/AuthLayout.vue';
import CustomerLayout from 'src/pages/CustomerView/Layout/CustomerLayout.vue';
// GeneralViews
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue';

// Calendar
const Calendar = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Calendar/CalendarRoute.vue');
// Charts
const Charts = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Charts.vue');

// Components pages
const Buttons = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Buttons.vue');
const GridSystem = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/GridSystem.vue');
const Panels = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Panels.vue');
const SweetAlert = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/SweetAlert.vue');
const Notifications = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Notifications.vue');
const Icons = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Icons.vue');
const Typography = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Typography.vue');

// Dashboard pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue');
import Widgets from 'src/pages/Widgets.vue';

// Accounting pages
const Accounting = () => import(/* webpackChunkName: "accounting" */ 'src/pages/Accounting/Accounting.vue');
// const AddAccounting = () => import(/* webpackChunkName: "accounting" */ 'src/pages/Accounting/AddAccounting.vue');
// const AccountingTable = () => import('src/pages/Accounting/AccountingTable.vue');
const PledgingAccounting = () => import(/* webpackChunkName: "accounting" */ 'src/pages/Pledging/PledgingAccounting.vue');
// const AddPledgingAccounting = () => import(/* webpackChunkName: "accounting" */ 'src/pages/Pledging/AddPledgingAccounting.vue');

// Inventory pages
const Inventory = () => import(/* webpackChunkName: "inventory" */ 'src/pages/Inventory/Inventory.vue');
const BuyStockInv = () => import('src/pages/Inventory/BuyStock/BuyStockInv.vue');
const ProductSettings = () => import('src/pages/Inventory/ProductSettings.vue');
const PledgingStockInv = () => import('src/pages/Pledging/PledgingStock/PledgingStockInv.vue');
const PledgingInventory = () => import('src/pages/Pledging/PledgingStock/PledgingInventory.vue');

// CustomerView pages
const CustomerDashboard = () => import(/* webpackChunkName: "customer" */ 'src/pages/CustomerView/Dashboard/Dashboard.vue');
// const CustomerPledging = () => import(/* webpackChunkName: "customer" */ 'src/pages/CustomerView/Pledging/Pledging.vue');
const ShopBrowse = () => import('src/pages/CustomerView/Shop/Shop.vue');
// const ShopProducts = () => import('src/pages/CustomerView/Shop/ShopProducts.vue');

// Managing pages
const ManageEmployee = () => import(/* webpackChunkName: "manageEmployee" */ 'src/pages/Employees/ManageEmployee.vue');
// const AddEmployee = () => import('src/pages/Employees/AddEmployee.vue');
const ManageShop = () => import(/* webpackChunkName: "manageShop" */ 'src/pages/ManageShop.vue');
// const ManageCustomer = () => import('src/pages/Customer/ManageCustomer.vue');
// const AddCustomer = () => import('src/pages/Customer/AddCustomer.vue');

// Forms pages
const RegularForms = () => import('src/pages/Forms/RegularForms.vue');
const ExtendedForms = () => import('src/pages/Forms/ExtendedForms.vue');
const ValidationForms = () => import('src/pages/Forms/ValidationForms.vue');
const Wizard = () => import('src/pages/Forms/Wizard.vue');

// Maps pages
const GoogleMaps = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Maps/GoogleMaps.vue');
const FullScreenMap = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Maps/FullScreenMap.vue');
const VectorMaps = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Maps/VectorMaps.vue');

// Pages
const User = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/UserProfile.vue');
const Pricing = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Pricing.vue');
const TimeLine = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/TimeLinePage.vue');
const Login = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Login.vue');
const Register = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Register.vue');
const RTL = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/RTLPage.vue');
const Lock = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Lock.vue');
const RegisterIndex = () =>
  import('src/pages/Pages/RegisterIndex.vue');

// User Profile
const Profile = () => import('src/pages/Users/Profile.vue')

// TableList pages
const RegularTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Tables/RegularTables.vue');
const ExtendedTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Tables/ExtendedTables.vue');
const PaginatedTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Tables/PaginatedTables.vue');
let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  name: 'Components',
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
      components: { default: Buttons }
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      components: { default: GridSystem }
    },
    {
      path: 'panels',
      name: 'Panels',
      components: { default: Panels }
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      components: { default: SweetAlert }
    },
    {
      path: 'notifications',
      name: 'Notifications',
      components: { default: Notifications }
    },
    {
      path: 'icons',
      name: 'Icons',
      components: { default: Icons }
    },
    {
      path: 'typography',
      name: 'Typography',
      components: { default: Typography }
    }
  ]
};
let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  name: 'Forms',
  children: [
    {
      path: 'regular',
      name: 'Regular Forms',
      components: { default: RegularForms }
    },
    {
      path: 'extended',
      name: 'Extended Forms',
      components: { default: ExtendedForms }
    },
    {
      path: 'validation',
      name: 'Validation Forms',
      components: { default: ValidationForms }
    },
    {
      path: 'wizard',
      name: 'Wizard',
      components: { default: Wizard }
    }
  ]
};

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  name: 'Tables',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
      components: { default: RegularTables }
    },
    {
      path: 'extended',
      name: 'Extended Tables',
      components: { default: ExtendedTables }
    },
    {
      path: 'paginated',
      name: 'Paginated Tables',
      components: { default: PaginatedTables }
    }
  ]
};

let mapsMenu = {
  path: '/maps',
  component: DashboardLayout,
  name: 'Maps',
  redirect: '/maps/google',
  children: [
    {
      path: 'google',
      name: 'Google Maps',
      components: { default: GoogleMaps }
    },
    {
      path: 'full-screen',
      name: 'Full Screen Map',
      meta: {
        hideContent: true,
        hideFooter: true
      },
      components: { default: FullScreenMap }
    },
    {
      path: 'vector-map',
      name: 'Vector Map',
      components: { default: VectorMaps }
    }
  ]
};

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  name: 'Pages',
  redirect: '/pages/user',
  children: [
    {
      path: 'timeline',
      name: 'Timeline Page',
      components: { default: TimeLine }
    },
    {
      path: 'rtl',
      name: 'RTL Page',
      components: { default: RTL }
    }
  ]
};

let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [
    {
      path: '/login',
      name: 'เข้าสู่ระบบ',
      components: { default: Login }
    },
    {
      path: '/register',
      name: 'ลงทะเบียน',
      components: { default: Register }
    },
    {
      path: '/pricing',
      name: 'Pricing',
      components: { default: Pricing }
    },
    {
      path: '/lock',
      name: 'Lock',
      components: { default: Lock }
    },
    {
      path: '/manageShop',
      name: 'จัดการร้านค้า',
      components: { default: ManageShop }
    },
    {
      path: '/register/index',
      name: 'ลงทะเบียน',
      components: {default: RegisterIndex}
    }
  ]
};

let customerPages = {
  path: '/customer',
  component: CustomerLayout,
  name: 'ระบบลูกค้า',
  redirect: '/customer/dashboard',
  children: [
    {
      path: 'dashboard',
      name: 'แดชบอร์ด',
      components: { default: CustomerDashboard }
    },
    {
      path: 'shop',
      name: 'ค้นหาร้านทอง',
      components: { default: ShopBrowse }
    },
    {
      path: 'profile',
      name: 'หน้าโปรไฟล์',
      components: { default: Profile }
    },
    // {
    //   path: 'shop/products',
    //   name: 'ค้นหาร้านทอง',
    //   components: { default: ShopProducts }
    // }
  ]
};

const routes = [
  {
    path: '/',
    redirect: '/login',
    name: 'เข้าสู่ระบบ'
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  authPages,
  customerPages,
  {
    path: '/shop',
    component: DashboardLayout,
    redirect: '/shop/dashboard',
    name: 'ระบบร้านค้า',
    children: [
      {
        path: 'dashboard',
        name: 'แดชบอร์ด',
        components: { default: Dashboard }
      },
      {
        path: 'inventory',
        name: 'คลังสินค้า',
        components: { default: Inventory }
      },
      {
        path: 'buyStockInventory',
        name: 'สต๊อกรับซื้อทองเก่า',
        components: { default: BuyStockInv }
      },
      {
        path: 'pledgingInventory',
        name: 'สต๊อกขายฝาก',
        components: { default: PledgingStockInv }
      },
      {
        path: 'productSettings',
        name: 'ตั้งค่ารหัสสินค้า',
        components: { default: ProductSettings }
      },
      {
        path: 'accounting',
        name: 'รายการซื้อขายทอง',
        components: { default: Accounting }
      },
      {
        path: 'pledgingAccounting',
        name: 'รายการขายฝากทอง',
        components: { default: PledgingAccounting }
      },
      {
        path: 'manageEmployee',
        name: 'จัดการพนักงาน',
        components: { default: ManageEmployee }
      },
      // {
      //   path: 'manageCustomer',
      //   name: 'จัดการข้อมูลลูกค้า',
      //   components: { default: ManageCustomer }
      // },
      {
        path: 'profile',
        name: 'หน้าโปรไฟล์',
        components: { default: Profile }
      },
      {
        path: 'calendar',
        name: 'Calendar',
        components: { default: Calendar }
      },
      {
        path: 'charts',
        name: 'Charts',
        components: { default: Charts }
      },
      {
        path: 'widgets',
        name: 'Widgets',
        components: { default: Widgets }
      },
      // {
      //   path: 'shop',
      //   name: 'ค้นหาร้านทอง',
      //   component: { default: ShopBrowse }
      // },
    ]
  },
  { path: '*', component: NotFound }
];

export default routes;
