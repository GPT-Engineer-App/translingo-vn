import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const UserGuide = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Hướng dẫn sử dụng</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>1. Tải lên tài liệu</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Nhấp vào nút "Chọn tệp" để tải lên tài liệu cần dịch. Hỗ trợ các định dạng phổ biến như .docx, .pdf, .txt.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>2. Nhập văn bản</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Nếu không có tài liệu, bạn có thể nhập trực tiếp văn bản cần dịch vào ô văn bản.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>3. Bắt đầu dịch</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Nhấn nút "Dịch sang tiếng Việt" để bắt đầu quá trình dịch thuật. Thời gian dịch phụ thuộc vào độ dài của tài liệu.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>4. Tải xuống bản dịch</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sau khi hoàn tất, bạn có thể tải xuống bản dịch bằng cách nhấn vào nút "Tải xuống tài liệu đã dịch".</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>5. Sử dụng trợ lý AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Nếu có thắc mắc, bạn có thể đặt câu hỏi cho trợ lý AI ở phần chat bên phải màn hình.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserGuide
