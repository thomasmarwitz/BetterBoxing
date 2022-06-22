package org.boxclub.api;

import org.boxclub.core.datatypes.PackingRequest;
import org.boxclub.core.datatypes.PackingResponse;
import org.boxclub.core.packing.BruteforceSolver;
import org.boxclub.core.packing.LargestAreaFitFirstSolver;
import org.boxclub.core.packing.PackingSolver;
import org.boxclub.core.sorting.DefaultPlacementComparator;
import org.boxclub.core.sorting.SortingPackingDecorator;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PackingController {
    private PackingSolver solver = new LargestAreaFitFirstSolver();
    private static final boolean USE_SORTING = true;

    @PostMapping("/pack")
    public PackingResponse pack(@RequestBody PackingRequest request) {
        switch (request.algorithm()) {
            case LARGEST_AREA_FIT_FIRST -> solver = new LargestAreaFitFirstSolver();
            case BRUTEFORCE -> solver = new BruteforceSolver();
        }
        if (USE_SORTING) solver = new SortingPackingDecorator(solver, new DefaultPlacementComparator());
        return solver.pack(request);
    }
}