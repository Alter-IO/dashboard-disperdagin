import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

export const EmployeeFilterContainer = () => {
    // const { data: employeePositions, isLoading, isError, error, refetch } = useQuery({
    //     queryKey: ['employee-positions'],
    //     queryFn: GetEmployeePositions,
    // })

    const [position, setPosition] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const handleApplyFilter = () => {
        console.log({ position, status });
        // Optionally: Close popover manually if you control open state (not needed for default behavior)
    };

    return (
        <div className="flex justify-end">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="px-4 py-2">Filter</Button>
                </PopoverTrigger>

                <PopoverContent className="w-56">
                    <div className="shadow-none border-none">
                        <div className="p-3">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Position</label>
                                <Select onValueChange={(value) => setPosition(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select position" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="developer">Developer</SelectItem>
                                        <SelectItem value="designer">Designer</SelectItem>
                                        <SelectItem value="manager">Manager</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1 mt-2">
                                <label className="text-sm font-medium">Status</label>
                                <Select onValueChange={(value) => setStatus(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button onClick={handleApplyFilter} className="w-full mt-3 px-4 py-2">
                                Apply Filter
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}