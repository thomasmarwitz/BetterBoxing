package org.boxclub.core.packing;

import org.boxclub.core.datatypes.PackingRequest;
import org.boxclub.core.datatypes.PackingResponse;

public abstract class AbstractPackingDecorator implements PackingSolver {
    private final PackingSolver subject;

    public AbstractPackingDecorator(PackingSolver subject) {
        this.subject = subject;
    }

    @Override
    public PackingResponse pack(PackingRequest request) {
        return subject.pack(request);
    }
}
