import { LightningElement, track } from 'lwc';
import getPosts from '@salesforce/apex/PostsController.getPosts'

export default class SampleTableWithPagination extends LightningElement {
    
    @track postsList = []
    @track pageList = []
    disableNext
    disablePrevious = true
    recordsPerPage = 25
    postsListLength
    currentPage = 1
    totalPages

    async connectedCallback() {
        this.postsList = await getPosts()
        this.postsListLength = this.postsList.length
        console.log(this.postsList)
        
        this.totalPages = Math.ceil(this.postsListLength/this.recordsPerPage)
        this.pageList = this.postsList.slice(0, this.recordsPerPage)
        console.log(`totalPages: ${this.totalPages}`)
        console.table(this.pageList)
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1
            this.generatePageList()
        }
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage -= 1
            this.generatePageList()
        }
    }

    generatePageList() {
        const begin = (this.currentPage - 1) * this.recordsPerPage
        const end = this.currentPage * this.recordsPerPage
        this.pageList = this.postsList.slice(begin, end)
        console.table(this.pageList)

        this.disableNext = this.currentPage === this.totalPages ? true : false
        this.disablePrevious = this.currentPage === 1 ? true : false
    }
}