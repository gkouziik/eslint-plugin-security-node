# Detect unsafe buffer allocation
We all know Nodejs Buffer. Now there's a method in buffer's Class, the **allocUnsafe**.
Before we dive into allocUnsafe 's evil "face" we need to clarify this method. 
```javascript
Buffer.allocUnsafe(size);
```
**size** (integer) -> The desired length of the new Buffer.

Allocates a new Buffer of size bytes.
A zero-length Buffer is created if size is 0.
(tip: pay attention to the lines below and the example)

The underlying memory for Buffer instances created in this way is not initialized.
The contents of the newly created Buffer are unknown and may contain sensitive data.
Example:

```javascript
const buf = Buffer.allocUnsafe(10);

console.log(buf);
// Prints (contents may vary) CHECK WHAT BUFFER CONTAINTS ->
// <Buffer a0 8b 28 3f 01 00 00 00 50 32>
```
### The question is, where's the problem?
We need to see the whole story here!
Why is buffer class exists in NodeJS API?
Client-side JavaScript spares us the need to deal with memory allocation.
Like many of its peer languages, in JS the underlying engine (e.g V8) allocates memory and garbage-collect it as needed, making coding simpler and safer.
In the browser, preventing access to memory is also necessary to maintain the sandbox JS runs in.
When JS expanded to the server with Node, the browser sandbox was removed, and the need for easy and fast binary data processing increased.
To address these needs, Node introduced the Buffer class, which deals with binary data.
Client-side JavaScript spares us the need to deal with memory allocation.
Like many of its peer languages, in JS the underlying engine (e.g. V8) allocates memory and garbage-collects it as needed, making coding simpler and safer.
In the browser, preventing access to memory is also necessary to maintain the sandbox JS runs in.
When JS expanded to the server with Node, the browser sandbox was removed, and the need for easy and fast binary data processing increased.
To address these needs, Node introduced the Buffer class, which deals with binary data.

In versions of Node.js prior to 6.0.0, Buffer instances were created using the Buffer constructor function, which allocates the returned Buffer differently based on what arguments are provided:

* Passing a number as the first argument to Buffer() (e.g. new Buffer(10)) allocates a new Buffer object of the specified size. Prior to Node.js 8.0.0, the memory allocated for such Buffer instances is not initialized and can contain sensitive data. Such Buffer instances must be subsequently initialized by using either buf.fill(0) or by writing to the entire Buffer. While this behavior is intentional to improve performance, development experience has demonstrated that a more explicit distinction is required between creating a fast-but-uninitialized Buffer versus creating a slower-but-safer Buffer. Since Node.js 8.0.0, Buffer(num) and new Buffer(num) return a Buffer with initialized memory.

* Passing a string, array, or Buffer as the first argument copies the passed object's data into the Buffer.

* Passing an ArrayBuffer or a SharedArrayBuffer returns a Buffer that shares allocated memory with the given array buffer.

Because the behavior of new Buffer() is different depending on the type of the first argument, security and reliability issues can be inadvertently introduced into applications when argument validation or Buffer initialization is not performed.

For example, if an attacker can cause an application to receive a number where a string is expected, the application may call new Buffer(100) instead of new Buffer("100"), it will allocate a 100 byte buffer instead of allocating a 3 byte buffer with content "100".
This is commonly possible using JSON API calls.
Since JSON distinguishes between numeric and string types, it allows injection of numbers where a naive application might expect to always receive a string.
Before Node.js 8.0.0, the 100 byte buffer might contain arbitrary pre-existing in-memory data, so may be used to expose in-memory secrets to a remote attacker.
Since Node.js 8.0.0, exposure of memory cannot occur because the data is zero-filled.
However, other attacks are still possible, such as causing very large buffers to be allocated by the server, leading to performance degradation or crashing on memory exhaustion.

To make the creation of Buffer instances more reliable and less error-prone, the various forms of the new Buffer() constructor have been deprecated and replaced by separate Buffer.from(), Buffer.alloc(), and Buffer.allocUnsafe() methods.

* Buffer.alloc(size[, fill[, encoding]]) returns a new initialized Buffer of the specified size. This method is slower than Buffer.allocUnsafe(size) but guarantees that newly created Buffer instances never contain old data that is potentially sensitive. A TypeError will be thrown if size is not a number.

* Buffer.allocUnsafe(size) and Buffer.allocUnsafeSlow(size) each return a new uninitialized Buffer of the specified size. Because the Buffer is uninitialized, the allocated segment of memory might contain old data that is potentially sensitive.

### What makes Buffer.allocUnsafe() "unsafe"?
When calling Buffer.allocUnsafe(), the segment of allocated memory is uninitialized (it is not zeroed-out).
While this design makes the allocation of memory quite fast, the allocated segment of memory might contain old data that is potentially sensitive.
Using a Buffer created by Buffer.allocUnsafe() without completely overwriting the memory can allow this old data to be leaked when the Buffer memory is read

### Where's the problem if I can always use Buffer.alloc() instead of Buffer.allocUnsafe() ?
Allocation is a synchronous operation and we know that single threaded Node.js doesn't really feel good about synchronous stuff.
Unsafe allocation is much faster than safe because the buffer sanitization step takes time.
Safe allocation is, well, safe, but there is a performance trade-off.


## Further Reading

[link 1](https://snyk.io/vuln/npm:ws:20160104)
[link 2](https://snyk.io/blog/exploiting-buffer/)

