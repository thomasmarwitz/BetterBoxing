package org.boxclub.core.packing;

import com.github.skjolber.packing.api.Container;
import com.github.skjolber.packing.packer.laff.LargestAreaFitFirstPackager;

import java.util.List;

public class LargestAreaFitFirstSolver extends AbstractPackingSolver {

    @Override
    protected LargestAreaFitFirstPackager getPackager(List<Container> containers) {
        return LargestAreaFitFirstPackager.newBuilder()
            .withContainers(containers)
            .build();
    }
}
