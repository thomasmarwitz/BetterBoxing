package org.boxclub.core.packing;

import com.github.skjolber.packing.api.Box;
import com.github.skjolber.packing.api.Container;
import com.github.skjolber.packing.api.StackPlacement;
import com.github.skjolber.packing.api.StackableItem;
import com.github.skjolber.packing.packer.AbstractPackager;
import org.boxclub.core.datatypes.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public abstract class AbstractPackingSolver implements PackingSolver {

    @Override
    public PackingResponse pack(PackingRequest request) {
        List<Bin> bins = request.bins();
        List<Container> containers = new ArrayList<>();
        for (Bin bin : bins) {
            containers.add(Container.newBuilder()
                .withId(bin.id())
                .withMaxLoadWeight(bin.maxWeight())
                .withEmptyWeight(bin.emptyWeight())
                // Coordinate transform: in our system, y is up, in the lib, z is up
                .withSize(bin.x(), bin.z(), bin.y())
                .build());
        }


        List<StackableItem> products = new ArrayList<>();

        List<Item> items = request.items();
        for (Item item : items) {
            products.add(new StackableItem(Box.newBuilder()
                .withId(item.id())
                // Coordinate transform: in our system, y is up, in the lib, z is up
                .withSize(item.x(), item.z(), item.y())
                .withWeight(1)
                .withRotate3D()
                .build(), item.count()));
        }

        List<Container> match = getPackager(containers).packList(products, request.binLimit());
        if (match == null) return new PackingResponse(false, null);

        List<PackedBin> packedBins = new ArrayList<>();

        for (Container container : match) {
            Optional<Bin> bin = bins.stream().filter(b -> Objects.equals(b.id(), container.getId())).findAny();

            // the container id does not match any of the given bins - should not happen!
            if (bin.isEmpty()) throw new AssertionError("result bin does not match any of the input bins");

            List<Placement> content = new ArrayList<>();
            for (StackPlacement stackPlacement : container.getStack().getPlacements()) {
                String id = stackPlacement.getStackable().getId();
                Optional<Item> item = items.stream().filter(i -> Objects.equals(i.id(), id)).findAny();

                // an item is lost - we could not package correctly
                if (item.isEmpty()) return new PackingResponse(false, null);

                // Coordinate transformation: in lib, z is up, in our system, y is up
                int x = stackPlacement.getAbsoluteX();
                int xEnd = stackPlacement.getAbsoluteEndX();
                int y = stackPlacement.getAbsoluteZ();
                int yEnd = stackPlacement.getAbsoluteEndZ();
                int z = stackPlacement.getAbsoluteY();
                int zEnd = stackPlacement.getAbsoluteEndY();

                content.add(new Placement(item.get(), x, xEnd, y, yEnd, z, zEnd));
            }
            packedBins.add(new PackedBin(bin.get(), content));
        }

        return new PackingResponse(true, packedBins);

    }

    protected abstract AbstractPackager getPackager(List<Container> containers);


}
