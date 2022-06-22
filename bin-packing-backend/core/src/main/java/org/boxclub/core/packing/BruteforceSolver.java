package org.boxclub.core.packing;

import com.github.skjolber.packing.api.Container;
import com.github.skjolber.packing.packer.bruteforce.BruteForcePackager;

import java.util.List;

public class BruteforceSolver extends AbstractPackingSolver {
    @Override
    protected BruteForcePackager getPackager(List<Container> containers) {
        return BruteForcePackager.newBuilder()
            .withContainers(containers)
            .build();
    }
}
