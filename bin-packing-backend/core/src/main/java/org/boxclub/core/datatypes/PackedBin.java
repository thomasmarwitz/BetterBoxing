package org.boxclub.core.datatypes;

import java.util.List;

public record PackedBin(Bin bin, List<Placement> content) {
}
