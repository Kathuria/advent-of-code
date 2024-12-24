from collections import Counter

def process_stones_optimized(stones, blinks):
    # Use a Counter to track stone counts
    stone_counts = Counter(stones)
    
    for _ in range(blinks):
        new_stone_counts = Counter()
        
        for stone, count in stone_counts.items():
            if stone == 0:
                new_stone_counts[1] += count
            elif len(str(stone)) % 2 == 0:
                str_stone = str(stone)
                mid = len(str_stone) // 2
                left = int(str_stone[:mid])
                right = int(str_stone[mid:])
                new_stone_counts[left] += count
                new_stone_counts[right] += count
            else:
                new_stone_counts[stone * 2024] += count
        
        stone_counts = new_stone_counts
    
    # Return the total count of stones
    return sum(stone_counts.values())

# Example usage
initial_sample_stones = [125, 17]
initial_stones = [337, 42493, 1891760, 351136, 2, 6932, 73, 0]
blinks_part1 = 25
blinks_part2 = 75

# Compute optimized results for initial-sample-stones
result_part1 = process_stones_optimized(initial_sample_stones, blinks_part1)
result_part2 = process_stones_optimized(initial_sample_stones, blinks_part2)

print(f"Number of stones after {blinks_part1} blinks: {result_part1}")
print(f"Number of stones after {blinks_part2} blinks: {result_part2}")



# Compute optimized results for initial-sample-stones
result_part3 = process_stones_optimized(initial_stones, blinks_part1)
result_part4 = process_stones_optimized(initial_stones, blinks_part2)

print(f"Number of stones after {blinks_part1} blinks: {result_part3}")
print(f"Number of stones after {blinks_part2} blinks: {result_part4}")
