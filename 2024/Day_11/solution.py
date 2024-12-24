def process_stones(stones, blinks):
    for _ in range(blinks):
        new_stones = []
        for stone in stones:
            if stone == 0:
                new_stones.append(1)
            elif len(str(stone)) % 2 == 0:
                str_stone = str(stone)
                mid = len(str_stone) // 2
                left = int(str_stone[:mid])
                right = int(str_stone[mid:])
                new_stones.extend([left, right])
            else:
                new_stones.append(stone * 2024)
        stones = new_stones
    return stones

# Example usage
initial_sample_stones = [125, 17]
initial_stones = [337, 42493, 1891760, 351136, 2, 6932, 73, 0]
blinks_part1 = 25
blinks_part2 = 75

result_stones_part1 = process_stones(initial_sample_stones, blinks_part1)
print(f"Number of stones after {blinks_part1} blinks: {len(result_stones_part1)}")

## Long prosessing times to get 75 blinks!
## From chatGBT: Processing for blinks 75, Attempting this calculation would likely exceed memory limits or result in excessive computation time, making it impractical to compute.
result_stones_part2 = process_stones(initial_sample_stones, blinks_part2)
print(f"Number of stones after {blinks_part2} blinks: {len(result_stones_part2)}")
