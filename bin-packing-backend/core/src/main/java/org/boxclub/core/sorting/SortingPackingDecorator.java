package org.boxclub.core.sorting;

import org.boxclub.core.datatypes.*;
import org.boxclub.core.packing.AbstractPackingDecorator;
import org.boxclub.core.packing.PackingSolver;

import java.util.Comparator;
import java.util.List;

public class SortingPackingDecorator extends AbstractPackingDecorator {

    private final Comparator<Placement> comparator;

    public SortingPackingDecorator(PackingSolver subject, Comparator<Placement> comparator) {
        super(subject);
        this.comparator = comparator;
    }

    @Override
    public PackingResponse pack(PackingRequest request) {
        PackingResponse packing = super.pack(request);
        if (!packing.success()) return packing;

        sortPacking(packing);
        return packing;
    }

    private void sortPacking(PackingResponse packing) {
        for (PackedBin packedBin : packing.packedBins()) {
            List<Placement> content = packedBin.content();
            content.sort(comparator);
        }
    }
}
