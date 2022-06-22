package org.boxclub.core.packing;

import org.boxclub.core.datatypes.PackingRequest;
import org.boxclub.core.datatypes.PackingResponse;

public interface PackingSolver {
    PackingResponse pack(PackingRequest request);
}
