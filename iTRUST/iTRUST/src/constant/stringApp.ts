const currency = `(VNĐ)`;

const support = {
  hotline: `+84 28 38100888`,
  emailsupport: `dfvn_cs@dai-ichi-life.com.vn`,
};
const riskAssessment = [
  {
    id: 'experienceInvestment',
    content: `1. Nhà đầu tư có kinh nghiệm trong hoạt động đầu tư chứng khoán ở mức nào?`,
    contentEn: `1. How experienced are investors in securities investment activities?`,
    data: [
      {
        id: 1,
        name: `Chưa có kinh nghiệm`,
        nameEn: `No experience`,
      },
      {
        id: 2,
        name: `Dưới 1 năm kinh nghiệm`,
        nameEn: `Less than 1 year of experience`,
      },
      {
        id: 3,
        name: `1 - 5 năm kinh nghiệm`,
        nameEn: `1 - 5 years of experience`,
      },
      {
        id: 4,
        name: `Trên 5 năm kinh nghiệm`,
        nameEn: `Over 5 years of experience`,
      },
    ],
  },
  {
    id: 'totalAsset',
    content: `2. Khoản đầu tư này chiếm bao nhiêu % trong tổng tài sản của Nhà đầu tư?`,
    contentEn: `2. How much % of the total assets of the Investor is this investment?`,
    data: [
      {
        id: 1,
        name: `Trên 60%`,
        nameEn: `Over 60%`,
      },
      {
        id: 2,
        name: `30% - 60%`,
        nameEn: `30% - 60%`,
      },
      {
        id: 3,
        name: `10% - 30%`,
        nameEn: `10% - 30%`,
      },
      {
        id: 4,
        name: `Dưới 10%`,
        nameEn: `Less than 10%`,
      },
    ],
  },
  {
    id: 'holdingTime',
    content: `3. Thời gian dự kiến Nhà đầu tư sẽ nắm giữ khoản đầu tư trung bình là bao lâu?`,
    contentEn: `3. How long is the average investor holding the investment?`,
    data: [
      {
        id: 1,
        name: `Dưới 1 năm`,
        nameEn: `Less than 1 year`,
      },
      {
        id: 2,
        name: `Từ 1 năm – 3 năm`,
        nameEn: `From 1 year - 3 years`,
      },
      {
        id: 3,
        name: `Trên 3 – 5 năm`,
        nameEn: `Over 3 - 5 years`,
      },
      {
        id: 4,
        name: `Trên 5 năm`,
        nameEn: `Over 5 years`,
      },
    ],
  },
  {
    id: 'realized',
    content: `4. Mức lỗ từ việc đầu tư vào Quỹ mở mà Nhà đầu tư có thể chấp nhận trong một thời gian ngắn?`,
    contentEn: `4. What is the amount of loss from investing in Open-ended Funds that investors can accept in a short time?`,
    data: [
      {
        id: 1,
        name: `Dưới 10%`,
        nameEn: `Less than 10%`,
      },
      {
        id: 2,
        name: `10% - 20%`,
        nameEn: `10% - 20%`,
      },
      {
        id: 3,
        name: `20% - 50%`,
        nameEn: `20% - 50%`,
      },
      {
        id: 4,
        name: `Trên 50%`,
        nameEn: `Over 50%`,
      },
    ],
  },
  {
    id: 'requirement',
    content: `5. Định hướng đầu tư của Nhà đầu tư`,
    contentEn: `5. Investor's investment orientation`,
    data: [
      {
        id: 1,
        name: `Nhà đầu tư không chấp nhận bất kỳ khoản lỗ nào cho dù khả năng đạt lợi nhuận có thể cao hơn`,
        nameEn: `Investors do not accept any loss even though the possibility of profit may be higher`,
      },
      {
        id: 2,
        name: `Nhà đầu tư có thể chấp nhận khả năng có thể có khoản lỗ nhỏ để có thể đạt được một mức lợi nhuận cao hơn`,
        nameEn: `Investors can accept the possibility of a small loss to be able to achieve a higher level of profit`,
      },
      {
        id: 3,
        name: `Nhà đầu tư có thể chấp nhận khả năng có thể lỗ nhiều để có thể đạt mức lợi nhuận cao hơn nữa`,
        nameEn: `Investors can accept the possibility of large losses to achieve even higher profits`,
      },
      {
        id: 4,
        name: `Nhà đầu tư có kỳ vọng lợi nhuận cao và không có giới hạn về đầu tư định mức`,
        nameEn: `Investors have high profit expectations and no limit on investment norms`,
      },
    ],
  },
];

const monthlyIncom = [
  {
    id: `1`,
    name: `< 30,000,000 ${currency}`,
    nameEn: `< 30,000,000 ${currency}`,
  },
  {
    id: `2`,
    name: `30,000,000 VNĐ - 80,000,000 ${currency}`,
    nameEn: `30,000,000 VNĐ - 80,000,000 ${currency}`,
  },
  {
    id: `3`,
    name: `81,000,000 VNĐ - 150,000,000 ${currency}`,
    nameEn: `81,000,000 VNĐ - 150,000,000 ${currency}`,
  },
  {
    id: `4`,
    name: `> 150,000,000 ${currency}`,
    nameEn: `> 150,000,000 ${currency}`,
  },
];

const source = [
  {
    id: 'SOURCE_SALARY',
    name: 'Lương',
    nameEn: 'Salary',
  },
  {
    id: 'SOURCE_BUSINESS',
    name: 'Kinh doanh',
    nameEn: 'Business Income',
  },
  {
    id: 'SOURCE_OTHER',
    name: 'Khác',
    nameEn: 'Other',
  },
];
export const stringApp = {
  appName: 'iTRUST',
  appLink: 'iTRUST',
  companyName: 'DFVN',
  riskAssessment: riskAssessment,
  source: source,
  monthlyIncom: monthlyIncom,
  currency: currency,
  hotline: support.hotline,
  emailsupport: support.emailsupport,
};
