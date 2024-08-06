import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const About = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Về chúng tôi</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Đơn vị phát triển</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Công ty TNHH Công nghệ AI Việt Nam là đơn vị tiên phong trong lĩnh vực ứng dụng trí tuệ nhân tạo vào các giải pháp ngôn ngữ. Với đội ngũ kỹ sư giàu kinh nghiệm và đam mê, chúng tôi cam kết mang đến những sản phẩm chất lượng cao, đáp ứng nhu cầu đa dạng của khách hàng.</p>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sứ mệnh</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Chúng tôi mong muốn xóa bỏ rào cản ngôn ngữ, kết nối con người và văn hóa thông qua công nghệ dịch thuật tiên tiến.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Liên hệ</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: info@aivietnam.com</p>
          <p>Điện thoại: 028 1234 5678</p>
          <p>Địa chỉ: 123 Đường AI, Quận 1, TP.HCM</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default About
