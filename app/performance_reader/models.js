//C# code

// using System;
// using System.Collections.Generic;

// namespace performance_reader
// {
//     public class RAM
//     {
//         // all values are in gigabytes
//         public float TotalMemory { get; internal set; }
//         public float UsedMemory { get; internal set; }
//         public float TotalMemoryOnDisk { get; internal set; }
//         public float UsedMemoryOnDisk { get; internal set; }
//     }

//     public class CPU
//     {
//         public string Name { get; internal set; }
//         public Core[] Cores { get; internal set; }
//         public float ClockSpeed { get; internal set; } // in gigahertz

//         public class Core
//         {
//             public float ClockSpeed { get; internal set; }
//         }
//     }

//     public class SystemInfo
//     {
//         public RAM MemoryInfo { get; internal set; }
//         public CPU CPU { get; internal set; }
//     }
// }
