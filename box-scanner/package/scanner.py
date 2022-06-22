import time

import pyrealsense2 as rs
import datetime

MILL_PER_M = 1000


class BoxScanner:

    def scan_box(self):
        try:
            # Create a context object. This object owns the handles to all connected realsense devices
            pipeline = rs.pipeline()

            # Configure streams
            config = rs.config()
            config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)

            # Start streaming
            pipeline.start(config)

            speed = 0.1  # in m/s
            centimeter_per_pixel = 0.09541

            in_frame = False
            past_frame = False
            width_list = []
            general_height = 0
            general_width = 0

            BREADTH_WITHOUT_DEAD_ANGLE = 500
            MIDDLE_HEIGHT = 240
            MINIMUM_DELTA = 0.03
            MOUNT_HEIGHT = 0.68

            TEST_VAR = 0

            positives_in_width_list = 0

            while not past_frame:
                frames = pipeline.wait_for_frames()
                depth = frames.get_depth_frame()
                line = ""
                d_list = []
                LEFT_END = 0
                RIGHT_END = 0

                for x in range(BREADTH_WITHOUT_DEAD_ANGLE):
                    d = round((depth.get_distance(x, MIDDLE_HEIGHT)), 2)
                    d_list.append(d)
                    if x > 220:
                        dif = d_list[x - 20] - d
                        if dif >= MINIMUM_DELTA and LEFT_END == 0 and d_list[x - 20] > 0:
                            LEFT_END = x
                        elif -dif >= MINIMUM_DELTA and RIGHT_END == 0 and d_list[x - 20] > 0:
                            RIGHT_END = x

                        if general_height == 0 and positives_in_width_list > 10 and (x - LEFT_END) == 30:
                            general_height = MOUNT_HEIGHT - d

                    line += f"{d} , {x} ##  "
                print(f"Line: {line}")
                width = RIGHT_END - LEFT_END
                print(f"left: {LEFT_END} {d_list[LEFT_END]}, right: {RIGHT_END} {d_list[RIGHT_END]}")
                print(f"width in pixels: {width}")
                if width > 0:
                    if not in_frame:
                        in_frame_time = datetime.datetime.now()
                        in_frame = True
                    positives_in_width_list += 1
                    if positives_in_width_list >= 20 and general_width == 0:
                        #width is in pixel, convert it to centimeters with the measured value
                        general_width = width * centimeter_per_pixel * 0.01
                elif width <= 0 and in_frame:
                    past_frame_time = datetime.datetime.now()
                    past_frame = True
                time.sleep(0.01)

            td = past_frame_time - in_frame_time
            general_length = (td.microseconds / 100000) * speed
            print(in_frame_time, past_frame_time)
            print(general_length)
            print(general_height, general_width)
            return int(general_length * MILL_PER_M), int(general_width * MILL_PER_M), int(general_height * MILL_PER_M)


        # except rs.error as e:
        #    # Method calls agaisnt librealsense objects may throw exceptions of type pylibrs.error
        #    print("pylibrs.error was thrown when calling %s(%s):\n", % (e.get_failed_function(), e.get_failed_args()))
        #    print("    %s\n", e.what())
        #    exit(1)
        except Exception as e:
            print(e)
        pass

