package org.asm.immomanage.dto;


import java.time.LocalDate;

public record ContractDto (
        String startDate,
        String endDate,
        String state
){}
