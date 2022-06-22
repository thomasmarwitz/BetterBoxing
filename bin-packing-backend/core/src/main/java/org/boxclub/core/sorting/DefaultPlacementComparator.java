package org.boxclub.core.sorting;

import org.boxclub.core.datatypes.Placement;

import java.util.Comparator;

public class DefaultPlacementComparator implements Comparator<Placement> {

    @Override
    public int compare(Placement o1, Placement o2) {
        // Coordinate system:
        //            ^
        //            y
        // <-- z ---- |
        //             \
        //              x
        //               \
        //                V

        if (o1.y() == o2.y()) {
            if (o1.x() == o2.x()) {
                return o2.z() - o1.z(); // left items first (more comfortable for right-handers?)
            } else return o1.x() - o2.x(); // back items first
        } else return o1.y() - o2.y(); // lower items first
    }
}