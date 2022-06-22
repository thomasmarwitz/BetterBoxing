package org.boxclub.core.datatypes;

import java.util.List;

public record PackingResponse(boolean success, List<PackedBin> packedBins) {
}
