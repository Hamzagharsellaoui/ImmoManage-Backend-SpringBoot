package org.asm.immomanage.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.asm.immomanage.models.RentalContract;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;

public class RentalContractGenerationService {
    public byte[] generateContract(RentalContract contract) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            String tenantName = contract.getTenant().getName();
            String tenantCin = contract.getTenant().getCin();
            String userName = contract.getManager().getName();
            String userCIN = contract.getManager().getCin();
            String propertyAddress = contract.getProperty().getAddress();
            LocalDate startDate = contract.getStartDate();
            LocalDate endDate = contract.getEndDate();
            Double rentAmount = contract.getRentAmount();

            document.add(new Paragraph("RENTAL AGREEMENT"));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("This Rental Contract is made on " + contract.getStartDate() + " between " + contract.getTenant().getName() + " (\"Tenant\") and " + contract.getManager().getName() + " (\"Manager\")."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Agency Manager: " + userName));
            document.add(new Paragraph("Manager CIN: " + userCIN));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Tenant: " + tenantName));
            document.add(new Paragraph("CIN: " + tenantCin));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Property: " + propertyAddress));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("1. Term:"));
            document.add(new Paragraph("The term of this rental agreement shall commence on " + startDate + " and shall continue until " + endDate + ", unless terminated earlier in accordance with the terms of this agreement."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("2. Rent:"));
            document.add(new Paragraph("The tenant agrees to pay the landlord rent in the amount of " + rentAmount + " per month, payable in advance on the first day of each month."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("3. Utilities:"));
            document.add(new Paragraph("The tenant shall be responsible for payment of all utilities and services, including but not limited to electricity, water, gas, and internet."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("5. Use of Property:"));
            document.add(new Paragraph("The property shall be used for residential purposes only and shall be occupied only by the tenant and the tenant's immediate family."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("6. Maintenance and Repairs:"));
            document.add(new Paragraph("The tenant shall maintain the property in a clean and sanitary condition. The tenant shall promptly notify the landlord of any damage, defects, or needed repairs."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("7. Termination:"));
            document.add(new Paragraph("Either party may terminate this agreement by providing 3 months written notice to the other party. Upon termination, the tenant shall vacate the property and return all keys to the landlord."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("8. Governing Law:"));
            document.add(new Paragraph("This agreement shall be governed by and construed in accordance with the laws of the [STATE/COUNTRY]."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Signatures:"));

//            if (contract.getTenantSignature() != null) {
//                Image tenantSignature = Image.getInstance(contract.getTenantSignature());
//                document.add(new Paragraph("Tenant Signature:"));
//                document.add(tenantSignature);
//            }
//
//            if (contract.getManagerSignature() != null) {
//                Image managerSignature = Image.getInstance(contract.getManagerSignature());
//                document.add(new Paragraph("Manager Signature:"));
//                document.add(managerSignature);
//            }

            document.add(new Paragraph("Date: " + LocalDate.now()));

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }
}
