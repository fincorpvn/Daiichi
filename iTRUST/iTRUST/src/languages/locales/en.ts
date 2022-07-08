import {stringApp} from 'constant';
export default {
  footerapp: {
    OverviewScreen: 'Dashboard',
    TransactionScreen: 'Transactions',
    InvestmentScreen: 'Products',
    AssetScreen: 'Asset',
    ProfileScreen: 'Account',
  },
  splashscreen: {
    hi: `Welcome to ${stringApp.companyName}`,
    continue: 'Next',
  },
  // loginscreen: {
  //   login: 'Login',
  //   saveusername: 'Remember Me',
  //   forgotpass: 'Forgot password ?',
  //   signuptitle: 'You do not have an account? ',
  //   signup: 'Register!',
  //   accountplacehoder: 'Mobile phone number',
  //   passwordplacehoder: 'Password',
  //   fincorp: `${stringApp.appName}`,
  //   thefintechdeveloper: 'Invest in what matters',
  //   welcome: `Welcome to ${stringApp.appName}!`,
  //   tendangnhap: 'Username',
  //   matkhau: 'Password',
  //   kichhoattaikhoan: 'Account activation',
  //   warning: `If the Investor has more than 01 account, contact DFVN for instructions`,
  // },
  loginscreen: {
    login: 'Đăng nhập',
    saveusername: 'Lưu tài khoản',
    forgotpass: 'Quên mật khẩu ?',
    signuptitle: 'Bạn chưa có tài khoản? ',
    signup: 'Đăng ký!',
    accountplacehoder: 'Nhập số điện thoại',
    passwordplacehoder: 'Nhập mật khẩu',
    fincorp: `${stringApp.companyName}`,
    thefintechdeveloper: 'The fintech developer',
    welcome: `Welcome to ${stringApp.companyName}!`,
    tendangnhap: 'Tên đăng nhập',
    matkhau: 'Mật khẩu',
    kichhoattaikhoan: 'Kích hoạt tài khoản',
    warning: `Nếu Nhà đầu tư có hơn 01 tài khoản, liên hệ DFVN để được hướng dẫn`,
  },
  reviewinfoscreen: {
    hosocanhan: 'Personal information',
    thongtincanhan: 'Personal information',
    hoantathosodangky: 'Complete the registration form',
    //
    thongtintaikhoannganhang: 'Bank account information',
    tenchutaikhoan: 'Account name',
    sotaikhoan: 'Account number',
    tennganhang: 'Bank name',
    chinhanh: 'Branch',
    //
    thongtinnhadautu: '1. Investor information',
    hoten: 'Full name',
    gioitinh: 'Gender',
    ngaysinh: 'Date of birth',
    quoctich: 'Nationality',
    email: 'Email',
    sodienthoai: 'Phone number',
    thongtingiayto:
      '2. Information on identification documents / securities trading code',
    note: 'Attention: Stock trading code is only for foreigners',
    loaigiayto: 'Type of document',
    sohieugiayto: 'Document number',
    ngaycap: 'Issued date',
    noicap: 'Issued by',
    taihinhanh: 'Upload a picture of your ID/Stock trading code',
    //
    thongtindiachi: 'Address information',
    diachithuongtru: '1. Permanent address',
    quocgia: 'Nation',
    tinhthanhpho: 'Province/City',
    quanhuyen: 'District',
    phuongxa: 'Wards',
    sonhatenduong: 'Address No & Street',
    diachilienhe: '2. Address',
    giongdiachithuongtru: 'Same as permanent address',
    diachikhac: 'Other address',
    trong: '',
    //
    dieukhoandieukienmotaikhoan: 'Terms and conditions for opening an account',
    dieukhoansudung: 'Terms of use',
    content: `After completing this confirmation step, the account opening contract information will be sent to your email \nPlease print, sign and send a letter to the address: \n - Customer Care Department of Joint Stock Company ${stringApp.companyName} Fund Management: 17th Floor, Sunwah Building, 115 Nguyen Hue, Ben Nghe Ward, District 1, Ho Chi Minh City (84) 28 3827 8535 \n - Head Office: \n 17th Floor, Court Sunwah House, 115 Nguyen Hue, Ben Nghe Ward, District 1, Ho Chi Minh City (84) 28 3827 8535 \n - Representative office in Hanoi: 6th Floor, International Center, 17 Ngo Quyen, Hoan Kiem District , Hanoi (84) 24 3936 4630`,
    //
    hoantat: 'Completed',
    danhgiamucdoruiro: 'Risk assessment',
  },
  forgotpasswordscreen: {
    forgotpassword: 'Forgot Password',
    content: `Please enter your registered username and follow the instructions`,
    continue: 'Continue',
    tendangnhap: 'Username',
  },
  registerscreen: {
    createaccount: 'Register Account',
    fullname: 'Full name',
    email: 'Email',
    phonenumber: 'Mobile phone number',
    userrefcode: 'Code of salesperson',
    continue: 'Next',
    tieptuc: 'Next',
    signintitle: 'You already have an account? ',
    signin: 'Log in',
    dangnhap: 'Log in!',
    dangki: 'Register',
    titletrong: '',
    hoantoanmienphivaratdongian: 'Free - Simple - Easy',
    hotendaydu: 'Full name',
    hotendaydu_ph:
      'Full name on identification document (Vietnamese with accents)',
    magioithieucuanguoibanhang: 'Code of salesperson',
    thongtinbatbuoc: 'Required information',
    tendaydubatbuocnhap: 'Full name is required',
    saidinhdangemail: 'Email is incorrect format',
    saisodienthoai: 'Phone number is incorrect',
    thongtinkhongduocdetrong: 'This field is required',
    emailkhongduocdetrong: 'Email is required',
    sodienthoaikhongduocdetrong: 'Phone number is required',
  },
  activeaccountscreen: {
    kichhoattaikhoan: 'Account activation',
    titletrong: '',
    sodienthoaidadangky: 'Your phone number',
    placehoder: 'Phone number, exp: 09123456789',
    tieptuc: 'Continue',
    contentactive:
      'Please provide the correct phone number registered to the trading account',
  },
  setpasswordscreen: {
    craetepass: 'Create Password',
    baomatthongtincanhan: 'Personal information security',
    rule: `Minimum length is 6 characters, include lowercase (a-z) and uppercase (A-Z), contain at least 1 number (0-9) or special symbols`,
    namelogin: 'Username',
    password: 'Password',
    repassword: 'Retype password',
    accept: 'Accept',
    create: 'Register',
    dangnhap: 'Login',
    taomatkhau: 'Create Password ',
    tendangnhap: 'Username',
    rule1: 'Minimum length is 6 characters',
    rule2: 'Include lowercase (a-z) and uppercase (A-Z)',
    rule3: 'Contain at least 1 number (0-9) or special symbols',
    matkhau: 'Password',
    nhaplaimatkhau: 'Retype password',
    matkhaubaogom: 'Password included:',
    tieptuc: 'Next',
    saidinhdangmatkhau: 'Password is invalid rules!',
    xacnhanmatkhaukhongdung: 'Retype password and Password do not match!',
    titletrong: '',
    thongtinkhongduocdetrong: 'Please enter your password',
    vuilongnhapmatkhau: 'Please enter your password',
    vuilongnhaplaimatkhau: 'Please re-enter your password',
    xacthuctaikhoan: 'Account verification',
  },
  otprequestmodal: {
    confirminformation: 'Authorization confirm',
    content: `Please enter the OTP verification code sent to your phone number`,
    confirm: 'Confirm',
    resendotp: 'Resend OTP',
    contenttiming: 'OTP code will expire within',
    otptimeout: 'OTP is expired',
  },
  loading: 'Loading',
  profile: {
    taikhoan: 'Account',
    file: 'Profile',
    hosogoc: 'Original file',
    logininfo: 'Login information',
    changepassword: 'Change password',
    changeemail: 'Change email',
    changepermanentaddress: 'Change Permanent address',
    changeaddress: 'Change mail address',
    logout: 'Log out',
    myrefcode: 'Referral Code: ',
    chukyso: 'Digital signatures',
    //trangthaitkdautu: 'Account Status: ',
    hosomotaikhoan: 'Application form',
    sotaikhoan: 'Account number - ',
    contentlogininfo: 'Are you sure you want to update your editing?',
    change: 'Change',
    email: 'Email',
    phone: 'Mobile phone number',
    password: 'Password',
    userref: 'Presenter',
    cannotchange: 'Cannot change',
    // list
    trangthaihoso: 'Document status',
    thongtintaikhoan: 'Profile',
    thaydoimatkhau: 'Change password',
    thaydoisodienthoai: 'Change phone number',
    thaydoiemail: 'Change email',
    hotrokhachhang: 'Callcenter',
    hotline: 'Hotline',
    caidatvabaomat: 'Setting & security',
    dangxuat: 'Logout',
    //
    oldpassword: 'Old Password',
    newpassword: 'New Password',
    renewpassword: 'Confirm New password',
    save: 'Save',
    rulepassword: `Password included: Minimum length is 6\n *Include lowercase (a-z) and uppercase (A-Z)\n *Contains at least 1 number (0-9) or special character`,
    //
    oldemail: 'Old Email',
    newemail: 'New Email',
    renewemail: 'Confirm new Email',
    //
    address: 'Address No  and Street',
    placeholderaddress: 'Enter address no and street name',
    nation: 'Country',
    city: 'Province/City',
    district: 'District',
    commune: 'Ward',
    emailsaidinhdang: 'Email is invalid format',
    matkhauchuadumanh: 'Your password is not strong.',
    //
    //
    saidinhdangmatkhau: 'Password is invalid rules!',
    xacnhanmatkhaukhongdung: 'Retype password and Password do not match!',
    titletrong: '',
    thongtinkhongduocdetrong:
      'Some required information is empty. Please check and try again',
  },
  // account verify screen
  accountverify: {
    thongtintaikhoan: 'Account Information',
    thongtincanhan: 'Personal information',
    hopdongdientu: 'E-Contract',
    thongtinnganhang: 'Bank account information',
    thongtindiachi: 'Address information',
    xacthuchoantat: 'Confirmation complete',
    chondiachilienhe: 'Select contact address',
    vuilongchondiachilienhe: 'Select province/city',
    sonhatenduong: 'Address',
    // trangthaitkdautu: 'Trạng thái tài khoản đầu tư',
    hosogoc: 'Original file',
    quocgia: 'Country',
    tinhthanhpho: 'Province/City',
    tinhthanhphotheodiachilienhe: 'Province/City (by contact address)',
    quanhuyen: 'District',
    phuongxa: 'Wards',
    nghenghiep: 'Job',
    chucvu: 'Position',
    mucthunhaphangthang: 'Monthly income',
    // account info modal
    // trangthaitkdautu: 'Trạng thái tài khoản đầu tư',
    vuilongchonquocgia: 'Please select a country',
    vuilongchontinhthanhpho: 'Please select a province/city',
    vuilongchonquanhuyen: 'Please select a county/district',
    vuilongchonphuongxa: 'Please select a ward',
    danhgiamucdoruiro: 'Risk assessment',
    guithongtin: 'Send information',
    //
    nguontiendautu: 'Income Source',

    thongtinnhadautu: '1. Investor information',
    hoten: 'Fullname',
    ngaysinh: 'Date of birth',
    gioitinh: 'Gender',
    quoctich: 'Nationality',
    nam: 'Male',
    nu: 'Female',
    email: 'Email',
    sodienthoai: 'Phone',
    thongtincmnd: '2. ID card information/Stock trading code',
    loaigiayto: 'Type of document',
    sohieugiayto: 'Document number',
    ngaycap: 'Issued date',
    cmnd: 'Identity card',
    magiaodichchungkhoan: 'Stock trading code',
    noicap: 'Issued by',
    taihinhanh: 'Upload a picture of your ID/Stock Trading Code',
    notetaihinhanh:
      'Available documents, Image should be clear, Original image, not accept a scan or copy',
    taianhmattruoc: 'Upload a photo of the front',
    taianhmatsau: 'Upload a photo of the back',
    vuilongchonloaigiayto: 'Please select document type',
    chuy: 'Note: The stock trading code is only for foreigners.',
    // bank info modal
    tenchutaikhoan: 'Account name',
    sotaikhoan: 'Account number',
    tennganhang: 'Bank name',
    chinhanh: 'Branch',
    content:
      'This required information and account information is transferred when the sell order is executed.',
    vuilongchonnganhang: 'Please select a bank',
    vuilongchonchinhanh: 'Please select a branch',
    // address info modal
    diachilienhe: 'Contact address',
    giongdiachithuongtru: 'Same as permanent address',
    diachikhac: 'Other address',
    diachithuongtru: 'Permanent address',
    // quyyen
    dieukhoan: 'Rules',
    xacnhanhoantat: 'Confirmation complete',
    hoantat: 'Completed',
    tongdongyvoidieukhoanfatca:
      'I agree to answer: No to all questions related to FATCA',
    contentinhoso: `Please print, sign and mail to the company's address in the contact section!`,
    contentdiachi1:
      'After completing this confirmation step, the account opening contract information will be sent to your email : ',
    contentdiachi2: 'Please print, sign and send a letter to the address: ',
    contentdiachi3: `- Customer Care Department of Joint Stock Company ${stringApp.companyName} Fund Management: 17th Floor, Sunwah Building, 115 Nguyen Hue, Ben Nghe Ward, District 1, Ho Chi Minh City \n(84) 28 3827 8535 \n - Head Office: \n 17th Floor, Court Sunwah House, 115 Nguyen Hue, Ben Nghe Ward, District 1, Ho Chi Minh City \n(84) 28 3827 8535 \n - Representative office in Hanoi: 6th Floor, International Center, 17 Ngo Quyen, Hoan Kiem District , Hanoi \n(84) 24 3936 4630`,
    toidongyvoidieukhoantren: 'I agree to the terms and conditions.',
    titleconfirm:
      'To start trading, you need to confirm the information and agree to the terms and conditions below:',
    congboruiro: 'RISK DISCLOSURE & ACKNOWLEDGEMENTS.',
    title1: '1. Risk disclosure.',
    content1: `I, as an Investor, have reviewed the provided information on Open-ended funds (OEFs) and fully understand what an OEF is.\n\nI, as an Investor, understand that I am participating into a product that invests into the Vietnamese securities market, including stocks, bonds and other securities instruments. I understand securities investments are subject to market risks and may fluctuate in value.\n\nMy expected return (if any) in OEFs is not guaranteed. I understand the actual return may be lower or higher than the expected or historical return.\n\nMy investments in OEFs may suffer losses if the securities that the OEFs invest into do not perform, or if the market is not favorable. I understand I may lose part of my investments if performance is not as expected.\n\n${stringApp.companyName} or ${stringApp.companyName}'s Partners cannot provide any guarantees, either explicitly or implicitly. I understand ${stringApp.companyName} and ${stringApp.companyName}'s Partners are under no legal obligation to compensate me for any losses to my investments.\n`,
    title2: '2. Acknoweldgements.',
    content2: `I have responsibility to read and agree with the Prospectus and Charter of the respective funds.\n\nI am responsible for my investment decision and accept all the investment risks.\n\nI understand and agree that ${stringApp.companyName} may submit my information and the information related to this account to the governing authority in Vietnam and/or the IRS upon their request in accordance with the FATCA-compliant regulations.\n\nI hereby confirm that the above information is true and accurate. I agree to notify ${stringApp.companyName} of any changes to the declared information.\n\nIn cases where my Subscription Orders are either invalid or sent after the cut-off time for a trading cycle, I authorize Distributor to keep my Subscription amount and subscribe for the next one (01) trading cycle.\n\nInvestors agree and acknowledge that ${stringApp.companyName} reserves the right to share investors’ information, including investment returns and investment transactions, with (the partner that introduced the investor to ${stringApp.companyName}), for the purpose of reporting, reconciliation and analysis.\n\nInvestors are fully responsible for all bank transfer charges (if applicable) that may be levied when subscribing, redeeming or exchanging fund units managed by ${stringApp.companyName}.\n`,
    title3:
      'In addition, there is an additional part of the commitment for investors to declare when related to US citizenship in Section III.SUPPLEMENTAL INFORMATION.',
    content3: `I here by confirm the information provided above is true, accurate and complete.\n\nSubject to applicable local laws, I hereby consent for ${stringApp.companyName} Investment Management Ltd to share my information with domestic and overseas tax authorities where necessary to establish my tax liability in any jurisdiction.\n\nWhere required by domestic or overseas regulators or tax authorities, I consent and agree that ${stringApp.companyName} may withhold such amounts as may be required according to applicable laws, regulations and directives.\n\nI undertake to notify ${stringApp.companyName} within 30 calendar days if there is a change in any information which I have provided to ${stringApp.companyName}.\n`,
    contentconfirm: `1.Risk disclosure \n\nI, as an Investor, have reviewed the provided information on Open-ended funds (OEFs) and fully understand what an OEF is.\n\nI, as an Investor, understand that I am participating into a product that invests into the Vietnamese securities market, including stocks, bonds and other securities instruments. I understand securities investments are subject to market risks and may fluctuate in value.\n My expected return (if any) in OEFs is not guaranteed. I understand the actual return may be lower or higher than the expected or historical return.\nMy investments in OEFs may suffer losses if the securities that the OEFs invest into do not perform, or if the market is not favorable. I understand I may lose part of my investments if performance is not as expected.\n${stringApp.companyName} or ${stringApp.companyName}'s Partners cannot provide any guarantees, either explicitly or implicitly. I understand ${stringApp.companyName} and ${stringApp.companyName}'s Partners are under no legal obligation to compensate me for any losses to my investments.\n\n2.Acknoweldgements\n\nI have responsibility to read and agree with the Prospectus and Charter of the respective funds\nI am responsible for my investment decision and accept all the investment risks.\nI understand and agree that ${stringApp.companyName} may submit my information and the information related to this account to the governing authority in Vietnam and/or the IRS upon their request in accordance with the FATCA-compliant regulations.\n I hereby confirm that the above information is true and accurate. I agree to notify ${stringApp.companyName} of any changes to the declared information.\nn cases where my Subscription Orders are either invalid or sent after the cut-off time for a trading cycle, I authorize Distributor to keep my Subscription amount and subscribe for the next one (01) trading cycle.\nInvestors agree and acknowledge that ${stringApp.companyName} reserves the right to share investors’ information, including investment returns and investment transactions, with (the partner that introduced the investor to ${stringApp.companyName}), for the purpose of reporting, reconciliation and analysis.\n Investors are fully responsible for all bank transfer charges (if applicable) that may be levied when subscribing, redeeming or exchanging fund units managed by ${stringApp.companyName}.`,
    //
    save: 'Save',
  },
  transactionscreen: {
    //sao ke giao dich
    saokegiaodich: 'Statement',
    chonquy: 'Fund',
    theothoidiemgiaodich: 'Theo thời điểm giao dịch',
    saoke: 'Sao kê',
    tungay: 'Từ ngày',
    denngay: 'Đến ngày',
    //
    giaodich: 'Transactions',
    navkytruoc: 'Current NAV',
    lenhchoxuly: 'Pending',
    lichsugiaodich: 'Transaction history',
    lenhchomua: 'Subscribe',
    lenhchoban: 'Redeem',
    lenhchochuyendoi: 'Switch',
    tongsolenh: 'Total: ',
    quychuongtrinh: 'Fund - Program',
    soluong: 'Units',
    sotienmuavnd: `Amount ${stringApp.currency}`,
    sotienmua: 'Amount',
    ngaydatlenh: 'Order date',
    trangthai: 'Status',
    nhapmalenh: 'Enter order code',
    ngay: 'Date',
    thoidiemgiaodich: 'Transaction time',
    chuacogiaodich: 'You have not created an order yet',
    // order buy detaisl
    thongtindautu: 'Investment information',
    quydautu: 'Invest funds',
    chuongtrinh: 'Program',
    loailenh: 'Order type',
    phiengiaodich: 'Trading session',
    thongtinchuyenkhoan: 'Bank transfer information',
    taikhoanthuhuong: 'Beneficiary account',
    tenthuhuong: 'Beneficiary',
    sotaikhoan: 'Account number',
    tennganhang: 'Bank name',
    noidung: 'Description',
    phuongthucchuyenkhoan: 'You are choosing a bank transfer method.',
    soccqban: 'Units',
    soccq: 'Units',
    ngaymua: 'Purchase date',
    tgnamgiu: 'Holding time',
    slban: 'Redemption units',
    phi: 'Fee',
    quymuctieu: 'Target Fund',
    giatriuoctinh: 'Estimated value',
    socqqchuyendoi: 'Units Switch',
    tongtien: 'Amount',
    ngaygiaodich: 'Trading date',
    malenh: 'Code',
    nav: 'NAV/Unit',
    locgiaodich: 'Transaction filtering',
    xoa: 'Delete',
    huy: 'Cancel',
    apdung: 'Apply',
    theoloailenh: 'Order type',
    tatca: 'All',
    lenhmua: 'Subscribe',
    lenhban: 'Redeem',
    lenhmuahoandoi: 'Switch-In Orders',
    lenhbanhoandoi: 'Switch-Out Orders',
    lenhhoandoi: 'Switch Orders',
    toingay: 'To date',
    taolenhmua: 'Subscribe order',
    taolenhban: 'Redeem order',
    taolenhchuyendoi: 'Switch order',
    // dinh ky
    dinhky: 'Systematic program',
    tinhtrang: 'Status',
    sotiendangkydautu: 'Amount',
    sokydaututoithieu: 'Min Invested Term',
    sokydadautu: 'Succeed Term',
    sokylientuckhongthamgia: 'Missing Term',
    kydaututieptheo: 'Next Term',
    copy: 'COPY',
    nganhang: 'Bank',
    chinhanh: 'Branch',
    nguoihuongthu: 'Beneficial owner',
    lichsukhoplenh: 'History Order',
    kydautu: 'Period',
    sotiendautu: 'Amount',
    ngaykhoplenh: 'Order matching date',
    taiphieuxacnhan: 'Download confirmation slip',
  },
  // setting screen
  settingscreen: {
    caidatvabaomat: 'Setting & Security',
    ngonngu: 'Language',
    nhanthongbao: 'Notification',
    faceid: 'Face ID/Touch ID',
    thongbao: 'Notification',
    content: 'Please enter your password to activate this function',
    matkhau: 'Password',
    huy: 'Cancel',
    xacnhan: 'Confirm',
    kichhoatthanhcong: 'Your Touch ID/Face ID activated successfully',
    xacnhanhuykichhoat: 'Are you sure you want to disactivate Touch ID/Face ID',
    matkhaucuaquykhachkhongdung: 'Password is invalid',
  },
  supportscreen: {
    hotrokhachhang: 'Customer Support',
    cskh: 'Customer care',
    email: 'Email',
    facebook: 'Facebook',
    trungtamchamsockhachhang: 'Customer care Center',
    chuyenvientrogiup: 'Consultant',
    hoten: 'Full name',
  },
  investmentscreen: {
    nam: 'Year',
    dautu: 'Invest',
    sanpham: 'Products',
    giadonviquykytruoc: 'Current NAV',
    ngay: 'Date',
    dautungay: 'Invest now',
    giatrihientai: 'Market value',
    danhsachphiengiaodich: 'List of trading sessions',
    phiengiaodich: 'Trading session',
    taolenhmua: 'Subscribe order',
    thaydoisovoidaunam: 'Year to Date return',
    taingay: 'at date',
    Taingay: 'Date',
    giatriNAVCCQ: 'NAV',
    NAVtaingay: 'NAV at ',
    tangtruongNAVCCQ: 'NAV/Unit growth - ',
    NAVcaonhat: 'Highest NAV',
    NAVthapnhat: 'Lowest NAV',
    NAV: 'NAV',
    khongconoidunghienthi: 'No Data',
    thang: 'Month',
    tatca: 'All time',
    navccq: 'NAV/Unit',
    thongtinquy: 'Fund information',
    xemchitiet: 'See details',
    xemthem: 'Show more',
  },
  createordermodal: {
    giatrimua: 'Purchase value',
    tudongtieptucdautu: 'Automatically continue to invest',
    ngaythanhtoanhangthang: 'Monthly payment date',
    datlenhmua: 'Subscribe order',
    datlenhban: 'Redeem order',
    datlenhchuyendoi: 'Switch order',
    xacnhan: 'Confirm',
    datlenh: 'Place Order',
    ketqua: 'Result',
    quaylai: 'Back',
    bieuphimua: 'Purchase fee schedule',
    thoigiandautulientuctoithieu: 'Minimum continuous investment period of',
    thang: 'months',
    bieuphichuyendoi: 'Conversion fee schedule',
    bieuphiban: 'Redemption fee schedule',
    // order buy
    ngaybatdauthamgia: 'Start date',
    tudongtaolenhdinhkyhangthang:
      'Automatically generate monthly recurring orders',
    chonsanpham: 'Select product',
    chonchuongtrinh: 'Select program',
    nhapsotienmua: 'Please input subscription amount',
    sotiendaututoithieu: 'Minimum investment amount',
    phimua: 'Fee',
    phichuyendoi: 'Switch fee',
    thoigiannamgiu: 'Holding time',
    xembieuphi: 'See fee schedule',
    thoidiemdongsolenh: 'Cut-off time',
    nhadautuvuilongchuyentientruoc: 'Please transfer money before',
    thoidiemdongsolenhnhantien: 'Cut-off time to receive money transfer',
    phiengiaodich: 'Trading session',
    thongtindautu: 'Investment information',
    quydautu: 'Investment funds',
    chuongtrinh: 'Program',
    loailenh: 'Order type',
    ngaydatlenh: 'Order date',
    sotienmua: 'Amount',
    phuongphapthanhtoan: 'Payment methods',
    chuyenkhoanquanganhang: 'Bank transfer',
    vuilongchuyentientruoc:
      'Investor should transfer money before trading date',
    thongtinchuyenkhoan: 'Bank transfer information',
    luuyttck:
      'Please copy exactly all information to ensure the order successful.',
    tenthuhuong: 'Beneficial Owner',
    sotaikhoan: 'Account number',
    nganhang: 'Bank',
    noidung: 'Description',
    mua: 'Subscribe',
    datlenhmuathanhcong: 'Your subscription order was successful',
    camonquykhachdadautuvao: 'Thank you for your investment in',
    muathem: 'Subscribe Continue',
    hoantat: 'Completed',
    xacnhanthanhtoan: 'Payment confirmation',
    contentxacnhanthanhtoan:
      'Please confirm the payment information for the investment with the following transfer information:',
    // order sell
    nhapsoluongban: 'Please input redemption units',
    soluongtoithieukhongduoi: 'Minimum quantity is not less than',
    soluongkhadung: 'Available Quantity',
    ngaymua: 'Purchase date',
    tgnamgiu: 'Holding time',
    slban: 'Redemption units',
    phi: 'Fee',
    phiban: 'Redemption fee',
    soluongban: 'Redemption units',
    ban: 'Redeem',
    giatriuoctinhsauthuephi: 'Estimated value after taxes, fees',
    datlenhbanthanhcong: 'You have successfully placed a sell order',
    camonquykhach: 'Thank you',
    // create order transder
    thongtinccqchuyendoi: 'Source Fund Information',
    chonccqchuyendoi: 'Select the switch fund',
    navkitruoc: 'Current NAV',
    soluongchuyendoi: 'Units',
    thongtinccqmuctieu: 'Target Fund Information',
    chonccqmuctieu: 'Select target fund',
    thongtinchuyendoi: 'Switch information',
    chuyendoi: 'Switch',
    datlenhchuyendoithanhcong:
      'You have successfully placed a conversion order',
    navccqkitruoc: 'Current NAV/Units',
    tatca: 'All',
  },
  assetscreen: {
    tongquantaisan: 'Property Overview',
    sl: 'Quantity: ',
    ccq: 'Units',
    giamua: 'Buying NAV',
    danhsachlenhmuadangnamgiu: 'List of holding subsciption orders',
    tongsodanhsach: 'Total list:',
    quychuongtrinh: 'Fund - Program',
    phiengiaodich: 'Trading session',
    tonggiatridangnamgiu: 'Total holding value',
    tonggiatridangchokhop: 'Total pending redemption amount',
    tongtaisan: 'Total asset',
    soluong: 'Units',
    giatridaututb: 'AVG investment',
    navkitruoc: 'Current NAV',
    giatrihientai: 'Market value',
    loilophantram: `Gain/loss(%)`,
    loilodong: `Gain/loss(VND)`,
    lenh: 'Command',
    chuongtrinh: 'Program',
    // details
    sotkdautu: 'Account number',
    giatrithitruong: 'Market value',
    sldonviquy: 'Units',
    sotiendadautu: 'Amount invested',
    sotiendadautuconlai: 'Remaining invested amount',
    ngaygiaodichdautien: 'First trading day',
    lailodathuchien: `Realized Gain/loss`,
    lailochuathuchien: `Unrealized Gain/loss`,
    loilo: 'Gain/loss',
    tongdautu: 'Total investment',
  },
  overviewscreen: {
    tongquantaisan: 'Property Overview',
    tongsocqq: 'Total units',
    giatrihientai: 'Market value',
    loilo: 'Gain/loss',
    banchuacotaisan: "You don't have any assets",
    contentnondata: `You need to participate in the investment and make transactions by going to the "Investment" section below`,
    tonggiatridaututb: 'Total AVG investment',
    sotiendautu: `Total investment`,
    sotiendautuvnd: `Total investment ${stringApp.currency}`, // 'Số tiền đầu tư (VNĐ)',
    tongloilo: 'Total gain/loss',
    taisan: 'Asset',
    //
    NAVhientai: 'NAV',
    tonggiatridaututrungbinh: `Total AVG investment ${stringApp.currency}`, //  'Total AVG investment (VNĐ)',
    giamuatrungbinh: `Average buying NAV/Unit`,
    tonggiatrithitruong: `Total market value ${stringApp.currency}`, // 'Total market value (VNĐ)',
    soluongCCQ: 'Units',
  },
  notificationscreen: {
    thongbao: 'Notification',
    huy: 'Cancel',
    xoamucdachon: 'Delete selected item',
  },
  MiniEkycModal: {
    xacthucthongtin: 'Verify information',
  },
  controlekyc: {
    dangnhap: 'Log In',
    xacthucthongtin: 'Verify information - eKYC',
    content:
      'To complete the account opening on MiO, please follow the steps below to verify your information',
    chuphinhmattruoc: '1. Take pictures of the front and back of your ID Card',
    chuphinhchandung: '2. Take a portrait photo',
    batdau: 'Start',
    thuchiensau: 'Do it later',
  },
  digitalsignature: {
    chukyso: 'Digital signatures',
    xemgiaydkgd: 'View BUSINESS REGISTRATION',
    uploadanh: 'Upload image',
    kyso: 'Digital signature',
    xoa: 'Clear',
    xacnhan: 'Confirm',
    contentnoti: 'Please sign in the area above',
    giaydkgd: 'BUSINESS REGISTRATION',
    mayanh: 'Camera',
    thuvien: 'Library',
    huy: 'Cancel',
    chonhinhanh: 'Select image',
    taive: 'Download',
    hopdongdientu: 'E-Contract',
    hopdongdientutype2: 'Giấy đăng ký mở tài khoản\ngiao dịch',
    xemtruoc: 'Preview',
    kydientu: 'Sign now',
    taichuky: 'Upload signature',
    chukycuaban: 'Your signature',
    taihopdongdaky: 'Download signed Account Opening Contract',
    taihopdongmotaikhoan: 'Download Account Opening Form',
    contentdownload:
      'Please review Your account opening form before e-signing contract. Click Sign Now and follow e-sign steps',
    contentdownload2: `Your Account Opening Contract is verified by esigned You please download your Account Opening Contract by clicking button below`,
  },
  feetable: {
    bieuphi: 'Tariffs',
  },
  alert: {
    ngaycap: 'Ngày cấp nhỏ hơn ngày sinh',
    vuilongchondayduthongtin: 'Please select full information!',
    kythanhcong: 'Quý khách đã ký điện tử thành công!',
    capnhatmucdoruirothanhcong: 'Update the risk level successfully !',
    logout: 'Log Out',
    taithanhcong: 'Download complete',
    taochukysothanhcong: 'You have been signed e-contract successfully!',
    contentlogout: 'Are you sure you want to log out?',
    dinhdanganhkhongphuhop:
      'The signature image you uploaded is not in the correct format. Please select image files with the format extention (.png,.jpg, .jpeg)',
    dong: 'Close',
    kydientu: 'Ký điện tử',
    desau: 'Để sau',
    xoalenh: 'Delete order success',
    dangxuat: 'Log Out',
    doiemailthanhcong: 'Change email success',
    doimatkhauthanhcong: 'Change password success',
    capnhatdiachithanhcong: 'Address update successful',
    capnhatthongtincanhanthanhcong: 'Personal information updated successful',
    dungluongtoida: 'Maximum size is 5MB',
    capnhatthongtintaikhoannganhangthanhcong:
      'Bank account information updated successful',
    // thong bao
    thongbao: 'Notification',
    dongy: 'Ok',
    huybo: 'Cancel',
    lichxong: 'Done',
    thulai: 'Again',
    thatbai: 'Failure',
    vuilongnhapdayduthongtincanhan: 'Please enter full personal information',
    vuilongnhapdayduthongtintaikhoannganhang:
      'Please enter full bank account information',
    vuilongnhapdayduthongtindiachi: 'Please enter full address information',
    daxayraloi:
      'Error! An error occurred. Please try again later. Please try again',
    dasaochepvaobonhodem: 'Copied to cache',
    vuilongnhapmatkhau: 'Please enter password',
    vuilongnhaptendangnhap: 'Please enter your username',
    dangnhapvantaythatbai:
      'Fingerprint login is not installed. Please login with password and check again',

    emailcuphaikhacemailmoi: `Old email must be different from New email`,
    xacnhanxoalenhgiaodich: 'Confirm delete transaction order?',
    registernhapquaotp:
      'Your session is expired, please refresh and create a new transaction',
    nhapotpquasoluong:
      'You have tried 3 times with invalid OTP. For security reasons please login again.',
    matkhaucuphaikhacmatkhaumoi: `The old password must be different from the new password`,
    ekycfail:
      'Currently, we cannot verify your information because of bad quality pictures. Please try later!',
    ekycfail3: `Chúng tôi không thể xác minh thông tin bạn đang cung cấp vì chất lượng hình chụp không tốt. Quý khách vui lòng khai báo thông tin cá nhân thủ công.`,
    dangkytaikhoanthanhcong:
      'You have successfully registered an account. If you need further advice, please contact us at (84-28) 3810 0888 – Ext: 5555 or (84) 983 070481.',
  },
  //
  component: {
    ngay: 'Day',
    thang: 'Month',
    nam: 'Year',
  },
};
