package org.asm.immomanage.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.AllArgsConstructor;
import org.asm.immomanage.mappers.PropertyDtoMapper;
import org.asm.immomanage.mappers.TenantDtoMapper;
import org.asm.immomanage.models.Property;
import org.asm.immomanage.models.RentalContract;
import org.asm.immomanage.models.Tenant;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@AllArgsConstructor
@Service
public class RentalContractGenerationService {
    private final ITenantService tenantService;
    private final TenantDtoMapper tenantDtoMapper;
    private final PropertyDtoMapper propertyDtoMapper;
    private final IPropertyService propertyService;

    public byte[] generateContract(long tenantID) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Document document = new Document(PageSize.A4, 36, 36, 36, 36);
            PdfWriter.getInstance(document, out);
            document.open();

            RentalContract rentalContract = new RentalContract();
            Tenant tenant = tenantDtoMapper.toTenant(tenantService.getTenantService(tenantID));
            Property property = propertyDtoMapper.toProperty(propertyService.getPropertyService(tenant.getIdActualProperty()));
            rentalContract.setTenant(tenant);
            rentalContract.setManager(tenant.getManager());
            rentalContract.setProperty(property);

            String propertyAddress = property.getAddress();
            LocalDate currentDate = LocalDate.now();
            String startDate = (LocalDate.now()).format(DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.ENGLISH));
            String endDate = (currentDate.plusYears(1)).format(DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.ENGLISH));
            double rentAmount = property.getRentPrice();
            String managerName = tenant.getManager().getName();
            LocalDate localDate = LocalDate.now();
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("EEE MMM dd yyyy", Locale.ENGLISH);
            Font titleFont = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD, BaseColor.BLACK);
            Font subtitleFont = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD, BaseColor.BLACK);
            Font normalFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
            Font boldFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);

            Paragraph title = new Paragraph("RENTAL AGREEMENT", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            document.add(new Paragraph("This Rental Contract is made on " + startDate + " between Tenant " + tenant.getName() + " and Manager " + managerName + ".", normalFont));
            document.add(new Paragraph("Agency Manager: " + managerName, normalFont));
            document.add(new Paragraph("Tenant: " + tenant.getName(), normalFont));
            document.add(new Paragraph("Tenant CIN: " + tenant.getCin(), normalFont));
            document.add(new Paragraph("Property: " + propertyAddress, normalFont));
            document.add(new Paragraph(" ", normalFont));

            addSection(document, "1. Term:", "The term of this rental agreement shall commence on " + startDate + " and shall continue until " +endDate+ ", unless terminated earlier in accordance with the terms of this agreement.", subtitleFont, normalFont);
            addSection(document, "2. Rent:", "The tenant agrees to pay the landlord rent in the amount of " + rentAmount + " per month, payable in advance on the first day of each month.", subtitleFont, normalFont);
            addSection(document, "3. Utilities:", "The tenant shall be responsible for payment of all utilities and services, including but not limited to electricity, water, gas, and internet.", subtitleFont, normalFont);
            addSection(document, "4. Maintenance and Repairs:", "The tenant shall maintain the property in a clean and sanitary condition. The tenant shall promptly notify the landlord of any damage, defects, or needed repairs.", subtitleFont, normalFont);
            addSection(document, "5. Termination:", "Either party may terminate this agreement by providing 3 months written notice to the other party. Upon termination, the tenant shall vacate the property and return all keys to the landlord.", subtitleFont, normalFont);
            addSection(document, "6. Governing Law:", "This agreement shall be governed by and construed in accordance with the laws of Tunisia .", subtitleFont, normalFont);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(20f);
            document.add(new Paragraph(" "));
            document.add(new Paragraph(" "));
            document.add(new Paragraph(" "));
            PdfPCell tenantCell = new PdfPCell(new Paragraph("Tenant Signature", boldFont));
            tenantCell.setBorder(Rectangle.NO_BORDER);
            tenantCell.setHorizontalAlignment(Element.ALIGN_LEFT);

            PdfPCell managerCell = new PdfPCell(new Paragraph("Manager Signature", boldFont));
            managerCell.setBorder(Rectangle.NO_BORDER);
            managerCell.setHorizontalAlignment(Element.ALIGN_RIGHT);

            table.addCell(tenantCell);
            table.addCell(managerCell);

            document.add(table);
            document.add(new Paragraph("Date: " + localDate.format(dateFormatter), normalFont));
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }

    private void addSection(Document document, String title, String content, Font titleFont, Font contentFont) throws DocumentException {
        Paragraph sectionTitle = new Paragraph(title, titleFont);
        sectionTitle.setSpacingBefore(10);
        sectionTitle.setSpacingAfter(5);
        document.add(sectionTitle);

        Paragraph sectionContent = new Paragraph(content, contentFont);
        sectionContent.setSpacingAfter(10);
        document.add(sectionContent);
    }
}
