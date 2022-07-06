import {Div, HTMLView, Label} from 'components';
import {Ecolors, Efonts} from 'constant';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthScreen} from 'utils';

const source = `<h3><strong><strong>THỎA THUẬN GIAO DỊCH TRỰC TUYẾN, C&Ocirc;NG BỐ RỦI RO V&Agrave; CAM KẾT CỦA NH&Agrave; ĐẦU TƯ</strong></strong></h3>

<h3><strong><strong>THỎA THUẬN GIAO DỊCH TRỰC TUYẾN</strong></strong></h3>

<h3>Bằng việc chọn nội dung &ldquo;Đồng &yacute;&rdquo; ở b&ecirc;n dưới, Nh&agrave; đầu tư đồng &yacute; với Thỏa thuận cung cấp Dịch vụ Giao dịch Trực tuyến v&agrave; Bản C&ocirc;ng bố Rủi ro Giao dịch Trực tuyến.</h3>

<h3><strong><strong>CAM KẾT CỦA NH&Agrave; ĐẦU TƯ </strong></strong></h3>

<h3><strong>1. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i x&aacute;c nhận rằng t&ocirc;i/ch&uacute;ng t&ocirc;i tr&ecirc;n 18 tuổi v&agrave; c&oacute; đầy đủ năng lực để tham gia v&agrave;o giao dịch mua, nắm giữ v&agrave; c&aacute;c giao dịch kh&aacute;c li&ecirc;n quan đến chứng chỉ quỹ mở.</h3>

<h3><strong>2. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i x&aacute;c nhận rằng đ&atilde; nhận, đọc v&agrave; hiểu c&aacute;c t&agrave;i liệu li&ecirc;n quan cung cấp th&ocirc;ng tin cho Nh&agrave; đầu tư, bao gồm nhưng kh&ocirc;ng giới hạn Bản C&aacute;o bạch, Điều lệ Quỹ v&agrave; Giấy Đăng k&yacute; mở t&agrave;i khoản Giao dịch chứng chỉ quỹ mở n&agrave;y v&agrave; chấp nhận c&aacute;c Điều khoản v&agrave; Điều kiện chi tiết trong c&aacute;c t&agrave;i liệu n&ecirc;u tr&ecirc;n, đặc biệt l&agrave; c&aacute;c nội dung về mục ti&ecirc;u, ch&iacute;nh s&aacute;ch đầu tư, c&aacute;c yếu tố rủi ro v&agrave; c&aacute;c loại ph&iacute; &aacute;p dụng cho Quỹ.</h3>

<h3><strong>3. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i đ&atilde; được tư vấn v&agrave; hướng dẫn từ Đại l&yacute; Ph&acirc;n phối về quy tr&igrave;nh v&agrave; hiểu r&otilde; c&aacute;c lưu &yacute; quan trọng khi đầu tư v&agrave;o chứng chỉ quỹ trước khi thực hiện mở T&agrave;i khoản giao dịch chứng chỉ quỹ mở.</h3>

<h3><strong>4. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i đ&atilde; tự t&igrave;m hiểu đầy đủ c&aacute;c th&ocirc;ng tin cũng như c&aacute;c rủi ro li&ecirc;n quan đến việc đầu tư v&agrave;o chứng chỉ Quỹ. Nh&agrave; đầu tư chịu tr&aacute;ch nhiệm về quyết định đầu tư cũng như chấp nhận những rủi ro tiềm ẩn li&ecirc;n quan đến việc đầu tư trong tương lai. DFVN, đại diện của DFVN, Đại l&yacute; Ph&acirc;n phối kh&ocirc;ng được xem l&agrave; cung cấp khuyến nghị đầu tư.</h3>

<h3><strong>5. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i muốn đăng k&yacute; mua chứng chỉ (c&aacute;c) Quỹ đầu tư ở mức gi&aacute; tại Ng&agrave;y định gi&aacute;/Ng&agrave;y giao dịch của chứng chỉ Quỹ v&agrave; cam kết thanh to&aacute;n tiền trước cho (c&aacute;c) khoản đầu tư đ&oacute;. Sau Ng&agrave;y định gi&aacute;/Ng&agrave;y giao dịch, gi&aacute; mỗi chứng chỉ Quỹ v&agrave; kết quả giao dịch sẽ được th&ocirc;ng b&aacute;o đến Nh&agrave; đầu tư bằng h&igrave;nh thức m&agrave; Nh&agrave; đầu tư đ&atilde; chọn.</h3>

<h3><strong>6. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i đồng &yacute; rằng c&aacute;c lệnh giao dịch li&ecirc;n quan đến Chứng chỉ Quỹ của t&ocirc;i/ch&uacute;ng t&ocirc;i sau n&agrave;y sẽ được thực hiện theo c&aacute;c văn bản hiện h&agrave;nh của DFVN &aacute;p dụng cho c&aacute;c Quỹ mở.</h3>

<h3><strong>7. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i hiểu rằng việc đăng k&yacute; mở t&agrave;i khoản của t&ocirc;i/ch&uacute;ng t&ocirc;i phụ thuộc v&agrave;o việc xem x&eacute;t v&agrave; chấp thuận của DFVN v&agrave;/hoặc c&aacute;c b&ecirc;n c&oacute; li&ecirc;n quan của quỹ.&nbsp;</h3>

<h3><strong>8. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i hiểu rằng Giấy Đăng k&yacute; mở t&agrave;i khoản Giao dịch chứng chỉ quỹ mở n&agrave;y c&oacute; thể được sửa đổi, bổ sung bởi DFVN m&agrave; kh&ocirc;ng cần n&ecirc;u l&yacute; do.</h3>

<h3><strong>9. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i x&aacute;c nhận v&agrave; đồng &yacute; rằng việc DFVN v&agrave; c&aacute;c tổ chức cung cấp dịch vụ chấp nhận v&agrave; xử l&yacute; lệnh mua, lệnh b&aacute;n, chuyển đổi, hủy (trừ Giấy Đăng k&yacute; mở T&agrave;i khoản Giao dịch Chứng chỉ quỹ mở) thực hiện bằng fax v&agrave;/hoặc h&igrave;nh thức điện tử kh&aacute;c m&agrave; kh&ocirc;ng c&oacute; x&aacute;c nhận bằng văn bản sau đ&oacute; vẫn được coi l&agrave; hợp lệ. DFVN v&agrave; c&aacute;c tổ chức cung cấp dịch vụ sẽ kh&ocirc;ng phải chịu tr&aacute;ch nhiệm đối với c&aacute;c tổn thất ph&aacute;t sinh trong qu&aacute; tr&igrave;nh thực hiện theo lệnh bằng fax v&agrave;/hoặc h&igrave;nh thức điện tử kh&aacute;c.</h3>

<h3><strong>10. </strong>T&ocirc;i/ch&uacute;ng t&ocirc;i x&aacute;c nhận rằng c&aacute;c th&ocirc;ng tin cung cấp với DFVN l&agrave; trung thực, đầy đủ v&agrave; ch&iacute;nh x&aacute;c. T&ocirc;i/ch&uacute;ng t&ocirc;i đồng &yacute; cập nhật c&aacute;c thay đổi về th&ocirc;ng tin tổ chức hay th&ocirc;ng tin c&aacute; nh&acirc;n của t&ocirc;i/ch&uacute;ng t&ocirc;i trong thời gian sớm nhất. T&ocirc;i/ch&uacute;ng t&ocirc;i x&aacute;c nhận sẽ bồi thường cho DFVN hoặc bất kỳ gi&aacute;m đốc, c&aacute;n bộ, nh&acirc;n vi&ecirc;n hoặc đại diện n&agrave;o của DFVN đối với bất kỳ tổn thất, thiệt hại hoặc c&aacute;c chi ph&iacute; kh&aacute;c m&agrave; họ c&oacute; thể phải g&aacute;nh chịu do th&ocirc;ng tin sai hoặc g&acirc;y nhầm lẫn hoặc th&ocirc;ng tin kh&ocirc;ng đầy đủ. T&ocirc;i/ch&uacute;ng t&ocirc;i x&aacute;c nhận rằng để ph&ugrave; hợp với quy định tại Bản C&aacute;o bạch, DFVN c&oacute; quyền mua lại chứng chỉ quỹ nếu t&ocirc;i/ch&uacute;ng t&ocirc;i kh&ocirc;ng thực hiện nghĩa vụ cập nhật th&ocirc;ng tin hoặc cung cấp th&ocirc;ng tin kh&ocirc;ng ch&iacute;nh x&aacute;c, sai lệch l&agrave;m ảnh hưởng đến DFVN.&nbsp;</h3>

<h3><strong>11. </strong>T&ocirc;i/ch&uacute;ng t&ocirc;i đồng &yacute; rằng dữ liệu của t&ocirc;i/ch&uacute;ng t&ocirc;i c&oacute; thể được chuyển cho cơ quan c&oacute; thẩm quyền nếu ph&aacute;p luật Việt Nam y&ecirc;u cầu. Dữ liệu đ&oacute; c&oacute; thể được sử dụng cho mục đ&iacute;ch quản trị t&agrave;i khoản, chống rửa tiền, chống t&agrave;i trợ khủng bố, x&aacute;c minh về thuế khi cần thiết, cũng như để chăm s&oacute;c kh&aacute;ch h&agrave;ng, quảng c&aacute;o v&agrave; nghi&ecirc;n cứu hoặc cung cấp th&ocirc;ng tin cho Nh&agrave; đầu tư về c&aacute;c dịch vụ v&agrave; sản phẩm quỹ do DFVN quản l&yacute;. T&ocirc;i/ch&uacute;ng t&ocirc;i đồng &yacute; rằng dữ liệu c&oacute; thể được chuyển cho c&aacute;c c&ocirc;ng ty do DFVN chỉ định v&agrave;/hoặc Đại l&yacute; Chuyển nhượng để hỗ trợ c&aacute;c hoạt động c&oacute; li&ecirc;n quan đến khoản đầu tư của t&ocirc;i/ch&uacute;ng t&ocirc;i v&agrave;o Quỹ.</h3>

<h3><strong>12. </strong>T&ocirc;i/Ch&uacute;ng t&ocirc;i đồng &yacute; nhận bằng địa chỉ email v&agrave; số điện thoại đ&atilde; đăng k&yacute; c&aacute;c th&ocirc;ng tin, th&ocirc;ng b&aacute;o từ DFVN, bao gồm nhưng kh&ocirc;ng giới hạn: Sao k&ecirc;, x&aacute;c nhận giao dịch, thị trường, giới thiệu sản phẩm, dịch vụ của DFVN; C&aacute;c th&ocirc;ng b&aacute;o li&ecirc;n quan đến c&ocirc;ng t&aacute;c dịch vụ kh&aacute;ch h&agrave;ng như: X&aacute;c nhận mở t&agrave;i khoản giao dịch chứng chỉ Quỹ, Th&ocirc;ng b&aacute;o nhận tiền đầu tư, Th&ocirc;ng b&aacute;o nhắc nhở về Chương tr&igrave;nh đầu tư định kỳ v&agrave; c&aacute;c th&ocirc;ng b&aacute;o, hướng dẫn c&oacute; li&ecirc;n quan kh&aacute;c. T&ocirc;i/ch&uacute;ng t&ocirc;i hiểu rằng Nh&agrave; đầu tư c&oacute; thể li&ecirc;n hệ DFVN - Bp. Chăm s&oacute;c Nh&agrave; đầu tư v&agrave; Dịch vụ Kh&aacute;ch h&agrave;ng để từ chối nhận th&ocirc;ng tin, th&ocirc;ng b&aacute;o n&agrave;y sau khi k&yacute; Giấy đăng k&yacute; mở T&agrave;i khoản n&agrave;y.</h3>

<h3><strong>13. </strong>Nh&agrave; đầu tư đồng &yacute; rằng DFVN, Ng&acirc;n h&agrave;ng Lưu k&yacute;, Ng&acirc;n h&agrave;ng Gi&aacute;m s&aacute;t hoặc Đại l&yacute; Chuyển nhượng c&oacute; quyền sử dụng, lưu trữ, tiết lộ, chuyển soạn, kết hợp, lấy v&agrave; trao đổi (bất kể trong hoặc ngo&agrave;i l&atilde;nh thổ Việt Nam), c&aacute;c th&ocirc;ng tin li&ecirc;n quan đến Nh&agrave; đầu tư hoặc do Nh&agrave; đầu tư cung cấp trực tiếp hay gi&aacute;n tiếp, m&agrave; DFVN, Ng&acirc;n h&agrave;ng Lưu k&yacute;, Ng&acirc;n h&agrave;ng Gi&aacute;m s&aacute;t hoặc c&aacute;c tổ chức cung cấp dịch vụ kh&aacute;c x&eacute;t thấy l&agrave; cần thiết cho hoặc c&oacute; li&ecirc;n quan đến việc cung cấp dịch vụ phục vụ Nh&agrave; đầu tư nhưng kh&ocirc;ng v&igrave; đạt được c&aacute;c lợi thế hoặc lợi &iacute;ch thương mại cho bản th&acirc;n m&igrave;nh ngo&agrave;i những g&igrave; thu được từ c&aacute;c dịch vụ c&oacute; li&ecirc;n quan hoặc theo y&ecirc;u cầu luật &aacute;p dụng. Nh&agrave; đầu tư cũng hiểu v&agrave; đồng &yacute; rằng b&ecirc;n thứ ba nhận th&ocirc;ng tin đ&oacute; c&oacute; thể phải tiết lộ th&ocirc;ng tin theo y&ecirc;u cầu luật &aacute;p dụng. Tất cả c&aacute;c th&ocirc;ng tin sẽ được nỗ lực bảo vệ ở mức độ hợp l&yacute; tr&aacute;nh việc bị x&acirc;m nhập hoặc tiết lộ tr&aacute;i ph&eacute;p.&nbsp;</h3>

<h3><strong><strong>TH&Ocirc;NG TIN BỔ SUNG ĐẠO LUẬT TU&Acirc;N THỦ FATCA</strong></strong></h3>

<h3>Bằng việc chọn nội dung &ldquo;Đồng &yacute;&rdquo; ở b&ecirc;n dưới, Nh&agrave; đầu tư trả lời &ldquo;Kh&ocirc;ng&rdquo; cho c&aacute;c nội dung sau đ&acirc;y:</h3>

<h3><strong>1...</strong> Qu&yacute; Nh&agrave; đầu tư l&agrave; c&ocirc;ng d&acirc;n Mỹ hoặc đối tượng cư tr&uacute; tại Mỹ?</h3>

<h3><em>*Nếu trả lời &ldquo;C&oacute;&rdquo;, vui l&ograve;ng khai mẫu W-9</em></h3>

<h3><strong>2...</strong> Qu&yacute; Nh&agrave; đầu tư c&oacute; nơi sinh tại Hoa Kỳ?</h3>

<h3><em>*Nếu trả lời &ldquo;C&oacute;&rdquo;, vui l&ograve;ng khai mẫu W-9 hoặc W-8BEN, cung cấp Hộ chiếu/Giấy tờ tương đương chứng nhận l&agrave; c&ocirc;ng d&acirc;n nước ngo&agrave;i v&agrave; giải tr&igrave;nh bằng văn bản li&ecirc;n quan đến quyền c&ocirc;ng d&acirc;n Mỹ.</em></h3>

<h3><strong>3...</strong> Qu&yacute; Nh&agrave; đầu tư c&oacute; địa chỉ thường tr&uacute; hoặc địa chỉ nhận thư tại Hoa Kỳ?</h3>

<h3><strong>4...</strong> Qu&yacute; Nh&agrave; đầu tư c&oacute; số điện thoại li&ecirc;n lạc tại Mỹ?</h3>

<h3><em>*Nếu trả lời &ldquo;C&oacute;&rdquo; tại bất cứ mục 3,4; vui l&ograve;ng khai mẫu W-9 hoặc W-8BEN v&agrave; cung cấp Hộ chiếu hoặc giấy tờ tương đương chứng nhận l&agrave; c&ocirc;ng d&acirc;n nước ngo&agrave;i hoặc Giấy chứng nhận cư tr&uacute; hoặc c&aacute;c t&agrave;i liệu kh&aacute;c của tổ chức trung gian để nhận diện kh&aacute;ch h&agrave;ng.</em></h3>

<h3><strong>5...</strong>Qu&yacute; Nh&agrave; đầu tư c&oacute; chỉ thị định kỳ chuyển khoản v&agrave;o một t&agrave;i khoản mở tại Hoa Kỳ hay định kỳ nhận tiền từ một t&agrave;i khoản tại Hoa Kỳ?</h3>

<h3><strong>6...</strong>Qu&yacute; Nh&agrave; đầu tư c&oacute; địa chỉ nhận thư hộ hoặc giữ thư tại Hoa Kỳ?</h3>

<h3><strong>7...</strong>Qu&yacute; Nh&agrave; đầu tư c&oacute; ủy quyền hoặc cấp thẩm quyền k&yacute; c&ograve;n hiệu lực đối với t&agrave;i khoản t&agrave;i ch&iacute;nh cho một đối tượng c&oacute; địa chỉ tại Hoa Kỳ?</h3>

<h3><em>*Nếu trả lời &ldquo;C&oacute;&rdquo; tại bất cứ mục 5,6,7; vui l&ograve;ng khai mẫu W-9 hoặc W-8BEN v&agrave; cung cấp Hộ chiếu, giấy tờ chứng minh kh&ocirc;ng phải l&agrave; c&ocirc;ng d&acirc;n Mỹ.</em></h3>

<h3><strong>Giải th&iacute;ch</strong></h3>

<h3><strong>1... </strong>Đối tượng cư tr&uacute; tại Hoa Kỳ bao gồm đối tượng c&oacute; thẻ xanh hoặc c&aacute; nh&acirc;n lưu tr&uacute; tại Hoa Kỳ &iacute;t nhất 31 ng&agrave;y trong năm hiện tại v&agrave; 183 ng&agrave;y trong giai đoạn 3 năm, bao gồm năm hiện tại v&agrave; 2 năm liền kề trước đ&oacute;.</h3>

<h3><strong>2... </strong>Qu&yacute; Nh&agrave; đầu tư c&oacute; tr&aacute;ch nhiệm tự x&aacute;c định t&igrave;nh trạng FATCA của m&igrave;nh. Bộ phận chuy&ecirc;n tr&aacute;ch FATCA kh&ocirc;ng n&ecirc;n trực tiếp gi&uacute;p kh&aacute;ch h&agrave;ng khai về t&igrave;nh trạng FATCA.</h3>

<h3><strong>3... </strong>Qu&yacute; Nh&agrave; đầu tư bắt buộc khai v&agrave;o nội dung Bảy dấu hiệu Mỹ gửi cho Đại l&yacute; ph&acirc;n phối. Đại l&yacute; Ph&acirc;n phối đồng thời sẽ cung cấp mẫu W-9 hoặc W- 8BEN cho Nh&agrave; đầu tư. Nh&agrave; đầu tư sẽ khai v&agrave; gửi lại đơn c&ugrave;ng c&aacute;c t&agrave;i liệu chứng minh cho Đại l&yacute; ph&acirc;n phối trong v&ograve;ng 90 ng&agrave;y từ ng&agrave;y nhận bộ đơn. Mọi thắc mắc xin vui l&ograve;ng li&ecirc;n hệ DFVN - Bp. Chăm s&oacute;c Nh&agrave; đầu tư v&agrave; Dịch vụ Kh&aacute;ch h&agrave;ng.</h3>

<h3><strong>4... </strong>Qu&yacute; Nh&agrave; đầu tư kh&ocirc;ng gửi lại bộ t&agrave;i liệu FATCA trong v&ograve;ng 90 ng&agrave;y cho Đại l&yacute; Ph&acirc;n phối th&igrave; t&agrave;i khoản n&agrave;y được ph&acirc;n loại l&agrave; &ldquo;T&agrave;i khoản chống đối&rdquo;.</h3>`;

function ConfirmContent(p: {email?: string}) {
  return (
    <Div backgroundColor={Ecolors.bgtime}>
      <Div paddingHorizontal={16} paddingTop={16}>
        <Label>{`accountverify.titleconfirm`}</Label>
        <Label
          marginTop={5}
          color={Ecolors.mainColor}
          fontWeight={'700'}
          multilanguage={false}
          lineHeight={22}
          size={15}>
          <Label
            lineHeight={22}
            size={15}>{`accountverify.contentdiachi1`}</Label>
          {`${p.email || ''}`}
        </Label>
      </Div>
      <HTMLView
        source={{
          html: source,
        }}
      />
    </Div>
  );
}

export default React.memo(ConfirmContent);
